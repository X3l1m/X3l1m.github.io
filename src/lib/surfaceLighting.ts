type SurfaceBounds = { left: number; top: number; width: number; height: number };

/** A nearby light brightens the facing edge and casts a shadow away from it. */
export function surfaceLighting(rect: SurfaceBounds, lightX: number, lightY: number, depth = 1) {
  const dx = rect.left + rect.width / 2 - lightX;
  const dy = rect.top + rect.height / 2 - lightY;
  const distance = Math.hypot(dx, dy);
  const edgeDistance = Math.hypot(
    Math.max(Math.abs(dx) - rect.width / 2, 0),
    Math.max(Math.abs(dy) - rect.height / 2, 0),
  );
  const strength = Math.max(0, 1 - edgeDistance / 720) ** 2;
  const projection = depth * (8 + 24 * strength) / Math.max(distance, 180);
  // Keep letter shadows short and readable, independently of the panel's depth.
  const textProjection = (1 + 3.5 * strength) / Math.max(distance, 160);
  const normal = Math.max(distance, 1);

  return {
    "--light-x": `${(lightX - rect.left).toFixed(1)}px`,
    "--light-y": `${(lightY - rect.top).toFixed(1)}px`,
    "--light-strength": (0.02 + strength * 0.24).toFixed(3),
    "--cast-x": `${(dx * projection).toFixed(2)}px`,
    "--cast-y": `${(dy * projection).toFixed(2)}px`,
    "--cast-blur": `${((14 + strength * 24) * depth).toFixed(1)}px`,
    "--cast-opacity": ((0.07 + strength * 0.22) * Math.min(depth, 1)).toFixed(3),
    "--text-x": `${(dx * textProjection).toFixed(2)}px`,
    "--text-y": `${(dy * textProjection).toFixed(2)}px`,
    "--text-blur": `${(2 + strength * 4).toFixed(1)}px`,
    "--text-opacity": (0.08 + strength * 0.32).toFixed(3),
    "--rim-x": `${(dx / normal).toFixed(2)}px`,
    "--rim-y": `${(dy / normal).toFixed(2)}px`,
    "--rim-strength": (0.12 + strength * 0.36).toFixed(3),
  };
}
