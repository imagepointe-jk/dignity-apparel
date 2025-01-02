"use client";

import styles from "@/styles/global/Mapbox.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { env } from "@/envClient";

type Props = {
  mapStyleUrl: string;
  containerClassName?: string;
};
export function Mapbox({ mapStyleUrl, containerClassName }: Props) {
  const mapRef = useRef(null as mapboxgl.Map | null);
  const mapContainerRef = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyleUrl,
    });

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, [mapContainerRef]);

  return (
    <div
      className={`${styles["main"]} ${containerClassName || ""}`}
      id="map-container"
      ref={mapContainerRef}
    ></div>
  );
}
