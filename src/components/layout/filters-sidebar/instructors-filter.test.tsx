import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SidebarProvider } from '@/components/ui/sidebar';
import { InstructorsFilter } from './instructors-filter';
import type { Instructor } from '#/api/instructors';

vi.mock('#/hooks/use-workshops-search-params', () => ({
  useWorkshopsSearchParams: () => [{ instructors: [] }, vi.fn()],
}));

const mockFetchInstructors = vi.hoisted(() => vi.fn());

vi.mock(import('#/api/instructors'), async (importOriginal) => {
  const mod = await importOriginal();
  return { ...mod, fetchInstructors: mockFetchInstructors };
});

// Testing Library's async utilities advance the fake clock exclusively
// through the `jest` global, which vitest doesn't provide.
const jestCompat = globalThis as typeof globalThis & {
  jest?: { advanceTimersByTime: (ms: number) => void };
};
jestCompat.jest ??= {
  advanceTimersByTime: (ms) => vi.advanceTimersByTime(ms),
};

const TOTAL = 23;

const FETCH_DELAY_MS = 10;

// Overridable total so some scenarios can use a smaller dataset.
let currentTotal = TOTAL;

function useTotal(total: number) {
  currentTotal = total;
}

const allInstructors: Instructor[] = Array.from({ length: TOTAL }, (_, i) => ({
  collectionId: 'collection-1',
  id: `instructor-${i + 1}`,
  name: `Instructor ${i + 1}`,
  photo: 'photo.jpg',
  specialization: 'Specialization',
}));

function paginate(perPage: number, page: number) {
  const start = (page - 1) * perPage;
  return {
    items: allInstructors.slice(start, start + perPage),
    totalItems: currentTotal,
    page,
    perPage,
    totalPages: Math.ceil(currentTotal / perPage),
  };
}

const user = userEvent.setup({
  advanceTimers: (ms) => vi.advanceTimersByTime(ms),
});

function renderFilter() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <InstructorsFilter />
      </QueryClientProvider>
    </SidebarProvider>,
  );
}

async function waitForContent(text: string): Promise<void> {
  await act(async () => {
    await vi.runAllTimersAsync();
  });
  expect(screen.getByText(text)).toBeInTheDocument();
}

function getShowMoreButton() {
  return screen.getByRole('button', { name: /pokaż więcej/i });
}

function queryShowMoreButton() {
  return screen.queryByRole('button', { name: /pokaż więcej/i });
}

function getSkeletons() {
  return screen.getAllByTestId('instructor-info-skeleton');
}

function getInstructorInfos() {
  return screen.getAllByTestId('instructor-info');
}

describe('InstructorsFilter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    currentTotal = TOTAL;
    mockFetchInstructors.mockReset();
    mockFetchInstructors.mockImplementation(({ perPage, page = 1 }) => {
      return new Promise((resolve) =>
        setTimeout(
          () => resolve(paginate(perPage ?? 500, page)),
          FETCH_DELAY_MS,
        ),
      );
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows 5 skeletons and disabled "show more" button during initial loading', () => {
    renderFilter();

    expect(getSkeletons().length).toEqual(5);
    expect(screen.queryByText('Instructor 1')).not.toBeInTheDocument();
    expect(getShowMoreButton()).toBeDisabled();
  });

  it('renders the first 5 instructors and a "show more" button', async () => {
    renderFilter();
    await waitForContent('Instructor 1');

    expect(getInstructorInfos().length).toEqual(5);
    expect(getShowMoreButton()).toBeEnabled();
  });

  describe('when the remaining items are fewer than a page size', () => {
    // With 10 total items the first click loads the remaining 5 (remaining
    // 5 = batch of new items 5 < pageSize 10). The button must stay visible
    // but disabled while loading, then disappear when the list is complete.
    beforeEach(() => {
      useTotal(10);
    });

    it('keeps a disabled "show more" button while loading', async () => {
      renderFilter();
      await waitForContent('Instructor 1');

      await user.click(getShowMoreButton());

      expect(getShowMoreButton()).toBeInTheDocument();
      expect(getShowMoreButton()).toBeDisabled();
      expect(getSkeletons().length).toEqual(5);

      await waitForContent('Instructor 6');

      expect(getInstructorInfos().length).toEqual(10);
      expect(queryShowMoreButton()).not.toBeInTheDocument();
    });
  });

  describe('first click on "show more" button', () => {
    beforeEach(async () => {
      renderFilter();
      await waitForContent('Instructor 1');
      await user.click(getShowMoreButton());
    });

    it('keeps previous items, shows 5 skeletons and disables the button', async () => {
      expect(screen.getByText('Instructor 1')).toBeInTheDocument();
      expect(getSkeletons().length).toEqual(5);
      expect(getShowMoreButton()).toBeDisabled();
    });

    it('shows 5 more instructors after they load', async () => {
      await waitForContent('Instructor 6');
      expect(getInstructorInfos().length).toEqual(10);
      expect(getShowMoreButton()).toBeEnabled();
    });
  });

  describe('second click on "show more" button', () => {
    beforeEach(async () => {
      renderFilter();
      await waitForContent('Instructor 1');
      await user.click(getShowMoreButton());
      await waitForContent('Instructor 6');

      await user.click(getShowMoreButton());
    });

    it('keeps previous items, shows 10 skeletons and disables the button', async () => {
      expect(screen.getByText('Instructor 6')).toBeInTheDocument();
      expect(getSkeletons().length).toEqual(10);
      expect(getShowMoreButton()).toBeDisabled();
    });

    it('shows 10 more instructors after they load', async () => {
      await waitForContent('Instructor 11');

      expect(getInstructorInfos().length).toEqual(20);
      expect(getShowMoreButton()).toBeEnabled();
    });
  });

  describe('third click on "show more" button', () => {
    beforeEach(async () => {
      renderFilter();
      await waitForContent('Instructor 1');
      await user.click(getShowMoreButton());
      await waitForContent('Instructor 6');
      await user.click(getShowMoreButton());
      await waitForContent('Instructor 11');

      await user.click(getShowMoreButton());
    });

    it('keeps previous items, shows 3 skeletons and hides the button', async () => {
      expect(screen.getByText('Instructor 11')).toBeInTheDocument();
      expect(getSkeletons().length).toEqual(3);
      expect(queryShowMoreButton()).not.toBeInTheDocument();
    });

    it('shows 3 more instructors after they load', async () => {
      await waitForContent('Instructor 21');

      expect(getInstructorInfos().length).toEqual(23);
      expect(queryShowMoreButton()).not.toBeInTheDocument();
    });
  });
});
