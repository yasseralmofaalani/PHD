import React from "react";
import { palette, alpha, type as typeTokens, space } from "../../design/tokens";

const SITES: Array<{ id: string; on: boolean }> = [
  { id: "D1", on: true },
  { id: "D2", on: false },
  { id: "AL", on: true },
  { id: "HO", on: true },
  { id: "HA", on: false },
  { id: "LA", on: true },
  { id: "TA", on: false },
  { id: "RA", on: false },
  { id: "DZ", on: true },
  { id: "HS", on: false },
  { id: "ID", on: true },
  { id: "DR", on: false },
];

/** Binary upgrade decision xᵢ ∈ {0,1} — site selected or kept. Always fully visible. */
export const BinaryDecisionBoard: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: space.sm,
      minHeight: 0,
    }}
  >
    <div
      dir="ltr"
      style={{
        fontFamily: typeTokens.numeral,
        fontSize: typeTokens.micro,
        fontWeight: 800,
        letterSpacing: "0.8px",
        color: palette.inkMuted,
      }}
    >
      xᵢ ∈ {"{0, 1}"}  ·  1 = ترقية  ·  0 = إبقاء
    </div>
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 8,
        minHeight: 0,
        alignContent: "center",
      }}
    >
      {SITES.map((s) => (
        <div
          key={s.id}
          style={{
            borderRadius: 10,
            background: s.on ? alpha(palette.primary, 0.16) : alpha(palette.ink, 0.05),
            border: `1.5px solid ${s.on ? palette.primary : alpha(palette.ink, 0.18)}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            minHeight: 0,
          }}
        >
          <div
            dir="ltr"
            style={{
              fontFamily: typeTokens.numeral,
              fontWeight: 900,
              fontSize: typeTokens.h2,
              color: s.on ? palette.primary : palette.inkMuted,
              lineHeight: 1,
            }}
          >
            {s.on ? "1" : "0"}
          </div>
          <div
            dir="ltr"
            style={{
              fontFamily: typeTokens.numeral,
              fontSize: 10,
              fontWeight: 800,
              color: palette.inkSoft,
            }}
          >
            {s.id}
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, color: s.on ? palette.primary : palette.inkMuted }}>
            {s.on ? "ترقية" : "إبقاء"}
          </div>
        </div>
      ))}
    </div>
  </div>
);
