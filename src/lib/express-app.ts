import express from "express";

export const expressApp = express();
expressApp.use(express.json());

expressApp.get("/health", (_req, res) => {
  res.json({ ok: true, service: "bachelor-rentals-express" });
});
