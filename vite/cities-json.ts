import type { Plugin } from 'vite';

type StaticDataFiles = Record<string, unknown>;

async function buildCityFiles(): Promise<StaticDataFiles> {
  const cityJson = await import('polish-cities/data/city.json', {
    with: { type: 'json' },
  });

  const citiesByLetter = cityJson.default.city
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce(
      (acc, { name, location: rawLocation }) => {
        const firstLetter = name[0].toLowerCase();
        if (!acc.hasOwnProperty(firstLetter)) {
          acc[firstLetter] = {};
        }

        const location = [...rawLocation.matchAll(/[\d.]+/g)].map(([match]) =>
          Number(match),
        ) as [number, number];

        acc[firstLetter][name] = location;

        return acc;
      },
      {} as Record<string, Record<string, [number, number]>>,
    );

  return Object.fromEntries(
    Object.entries(citiesByLetter).map(([letter, cities]) => [
      `data/cities/${letter}.json`,
      cities,
    ]),
  );
}

export function citiesJson(): Plugin {
  return {
    name: 'cities-json',
    configureServer(server) {
      let filesPromise: Promise<StaticDataFiles> | undefined;
      const getFiles = () =>
        (filesPromise ??= Promise.resolve().then(buildCityFiles));

      server.middlewares.use(async (req, res, next) => {
        const { pathname } = new URL(req.url ?? '/', 'http://localhost');
        const path = decodeURIComponent(pathname).slice(1);

        try {
          const data = (await getFiles())[path];

          if (data === undefined) {
            next();
            return;
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch (error) {
          filesPromise = undefined;
          server.ssrFixStacktrace(error as Error);
          res.statusCode = 500;
          res.end(String(error));
        }
      });
    },
    async generateBundle() {
      for (const [fileName, data] of Object.entries(await buildCityFiles())) {
        this.emitFile({
          type: 'asset',
          fileName,
          source: JSON.stringify(data),
        });
      }
    },
  };
}
