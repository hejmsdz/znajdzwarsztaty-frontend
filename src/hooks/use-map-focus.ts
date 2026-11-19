import { useCallback, useEffect, useState } from 'react';
import type { ComponentRef, RefObject } from 'react';
import type { LayerEvent, MarkerCluster } from 'leaflet';
import type MarkerClusterGroup from 'react-leaflet-cluster';
import type { Marker } from 'react-leaflet';

type MarkerInstance = ComponentRef<typeof Marker>;
type ClusterGroupInstance = ComponentRef<typeof MarkerClusterGroup>;

/**
 * Leaflet.markercluster sets `__parent` once the marker has been added to the
 * cluster tree; it stays unset while the marker is queued for clustering.
 */
type ClusteredMarker = MarkerInstance & { __parent?: MarkerCluster };

function getClusterParent(marker: MarkerInstance): MarkerCluster | undefined {
  return (marker as ClusteredMarker).__parent;
}

/**
 * Focuses the workshop marker matching `#w-<id>` in the URL: zooms to it
 * (expanding its cluster, spiderfying if needed) and opens its popup.
 *
 * Returns the ref callback to attach to every `<Marker>`; it captures the
 * marker whose id matches the URL hash.
 *
 * The zoom cannot run from that ref callback: react-leaflet-cluster buffers
 * layer additions and flushes them in a microtask that can land after the
 * next render, while `zoomToShowLayer` walks the marker's cluster chain
 * (`__parent`), which only exists once the marker has been processed. So
 * registration is awaited via the group's `layeradd` event — fired right
 * after a marker joins the tree; it also fires for markers that are still
 * queued, hence the re-check — and turned into state, so that the zoom runs
 * in the follow-up render's effect, after the buffered batch has fully
 * settled. No separate map-readiness event is needed: react-leaflet
 * initializes the map, including its initial view, before rendering any
 * children.
 */
export function useMapFocus(
  clusterRef: RefObject<ClusterGroupInstance | null>,
) {
  const [focusMarker, setFocusMarker] = useState<MarkerInstance | null>(null);
  const [registeredMarker, setRegisteredMarker] =
    useState<MarkerInstance | null>(null);

  const captureMarker = useCallback(
    (marker: MarkerInstance | null, id: string) => {
      if (marker && location.hash === `#w-${id}`) {
        setFocusMarker(marker);
      }
    },
    [],
  );

  // Watch the captured marker until it has joined the cluster tree. `layeradd`
  // also fires for markers that are still queued (before `__parent` exists),
  // so the handler re-checks before reacting.
  useEffect(() => {
    if (!focusMarker) {
      return;
    }

    if (getClusterParent(focusMarker)) {
      setRegisteredMarker(focusMarker);
      return;
    }

    const cluster = clusterRef.current;
    if (!cluster) {
      return;
    }

    const onLayerAdd = (event: LayerEvent) => {
      if (event.layer === focusMarker && getClusterParent(focusMarker)) {
        setRegisteredMarker(focusMarker);
      }
    };

    cluster.on('layeradd', onLayerAdd);
    return () => {
      cluster.off('layeradd', onLayerAdd);
    };
  }, [clusterRef, focusMarker]);

  useEffect(() => {
    if (!registeredMarker || !getClusterParent(registeredMarker)) {
      return;
    }

    clusterRef.current?.zoomToShowLayer(registeredMarker, () => {
      registeredMarker.openPopup();
    });
  }, [clusterRef, registeredMarker]);

  return captureMarker;
}
