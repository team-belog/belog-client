import type { PostLogTicketDetail } from "@/features/post-log/types";

const W = 335;
const H = 565;
const CR = 21.5;
const NR = 9;
const NC = 7;
const DPR = 2;
const PAD = 20;

const COLOR_BLACK = "#303237";
const COLOR_GRAY2 = "#A6A6A6";
const COLOR_CHIP_BG = "#F7F8F9";

const BELOG_ICON_SVG = `<svg width="14" height="12" viewBox="0 0 105 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M105 49.9954L105 78.2518C105 88.259 97.6061 96.7757 87.6473 97.7589C64.2431 100.069 41.977 100.481 18.5851 99.5065C8.46271 99.0848 0.423332 90.9088 0.185732 80.7805C0.0572755 75.3047 -1.31476e-06 69.8197 -1.56748e-06 64.0186L-1.93933e-06 55.4827C0.972221 20.364 10.816 3.41433 33.0556 3.41433C38.1219 3.41433 43.0062 4.4493 47.3226 7.50865C50.0739 9.45862 54.2366 9.17475 56.6002 6.76953C60.9411 2.35216 66.7334 4.10957e-07 74.7396 5.98064e-08C96.6146 -8.99624e-07 105 18.5349 105 49.9954ZM37.3122 64.4637C39.7295 64.4553 41.7025 62.5549 41.7605 60.1383C41.8056 58.2613 41.8056 56.3842 41.8056 54.5072C41.684 46.3372 40.5903 39.8744 35.6076 39.8744C30.5035 39.8744 29.8958 46.3372 29.7743 54.1414C29.7743 56.0912 29.8169 58.1264 29.9022 60.1459C30.0018 62.5066 31.8963 64.383 34.2585 64.4358C35.2812 64.4587 36.2984 64.4672 37.3122 64.4637ZM64.1667 59.3103C64.1667 61.8162 66.1221 63.897 68.6277 63.9404C70.081 63.9655 71.5433 63.9631 73.0099 63.9332C75.3894 63.8845 77.3016 61.9952 77.3614 59.616C77.4132 57.5528 77.4132 55.4987 77.4132 53.5317C77.2917 44.5081 76.3194 37.9234 70.4861 37.9234C65.0174 37.9234 64.1667 44.5081 64.1667 53.1659L64.1667 59.3103Z" fill="#2B2B2B"/><ellipse cx="37.333" cy="47.9954" rx="14" ry="17.5594" fill="white"/><ellipse cx="72.333" cy="47.9954" rx="14" ry="17.5594" fill="white"/><ellipse cx="43.1667" cy="47.9956" rx="8.16667" ry="8.19438" fill="#49D4B6"/><ellipse cx="78.1667" cy="47.9956" rx="8.16667" ry="8.19438" fill="#49D4B6"/></svg>`;

function ticketPath(ctx: CanvasRenderingContext2D, ox: number, oy: number): void {
  const available = W - 2 * CR;
  const gap = (available - NC * 2 * NR) / (NC + 1);
  const centers = Array.from({ length: NC }, (_, i) => CR + gap + NR + i * (2 * NR + gap));

  ctx.beginPath();
  ctx.moveTo(ox + CR, oy);

  // Top edge
  for (const cx of centers) {
    ctx.lineTo(ox + cx - NR, oy);
    ctx.arc(ox + cx, oy, NR, Math.PI, 0, true);
  }

  // Top-right inward corner (CCW = matches SVG sweep=0)
  ctx.lineTo(ox + W - CR, oy);
  ctx.arc(ox + W, oy, CR, Math.PI, Math.PI / 2, true);

  // Right edge (straight)
  ctx.lineTo(ox + W, oy + H - CR);

  // Bottom-right inward corner
  ctx.arc(ox + W, oy + H, CR, 1.5 * Math.PI, Math.PI, true);

  // Bottom edge (reversed)
  for (const cx of [...centers].reverse()) {
    ctx.lineTo(ox + cx + NR, oy + H);
    ctx.arc(ox + cx, oy + H, NR, 0, Math.PI, true);
  }

  // Bottom-left inward corner
  ctx.lineTo(ox + CR, oy + H);
  ctx.arc(ox, oy + H, CR, 0, 1.5 * Math.PI, true);

  // Left edge (straight)
  ctx.lineTo(ox, oy + CR);

  // Top-left inward corner
  ctx.arc(ox, oy, CR, Math.PI / 2, 0, true);

  ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number, y: number, w: number, h: number,
): void {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string | null | undefined,
  maxWidth: number,
  maxLines: number,
): string[] {
  if (!text) return [];
  const lines: string[] = [];
  let cur = "";
  for (const ch of [...text]) {
    const test = cur + ch;
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur);
      if (lines.length >= maxLines) return lines;
      cur = ch;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function drawChip(ctx: CanvasRenderingContext2D, text: string, x: number, y: number): number {
  const PX = 8;
  const PY = 5;
  const R = 5;
  const textW = ctx.measureText(text).width;
  const chipW = textW + PX * 2;
  const chipH = 12 + PY * 2;

  ctx.beginPath();
  ctx.moveTo(x + R, y);
  ctx.lineTo(x + chipW - R, y);
  ctx.arcTo(x + chipW, y, x + chipW, y + R, R);
  ctx.lineTo(x + chipW, y + chipH - R);
  ctx.arcTo(x + chipW, y + chipH, x + chipW - R, y + chipH, R);
  ctx.lineTo(x + R, y + chipH);
  ctx.arcTo(x, y + chipH, x, y + chipH - R, R);
  ctx.lineTo(x, y + R);
  ctx.arcTo(x, y, x + R, y, R);
  ctx.closePath();
  ctx.fillStyle = COLOR_CHIP_BG;
  ctx.fill();

  ctx.fillStyle = COLOR_GRAY2;
  ctx.fillText(text, x + PX, y + PY);

  return chipW;
}

export async function drawTicketToCanvas(ticket: PostLogTicketDetail): Promise<Blob> {
  await document.fonts.ready;

  const canvas = document.createElement("canvas");
  canvas.width = (W + PAD * 2) * DPR;
  canvas.height = (H + PAD * 2) * DPR;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(DPR, DPR);
  ctx.textBaseline = "top";

  const bodyStyle = window.getComputedStyle(document.body);
  const PRE = bodyStyle.getPropertyValue("--font-pretendard").trim() || "sans-serif";
  const PTS = bodyStyle.getPropertyValue("--font-pt-sans-narrow").trim() || '"PT Sans Narrow"';

  const ox = PAD;
  const oy = PAD;

  const coverSrc = ticket.coverPhotoUrl
    ? `/api/image-proxy?url=${encodeURIComponent(ticket.coverPhotoUrl)}`
    : "/icons/post-log/ticket-cover.jpg";

  const [coverResult, wordmarkResult, iconResult] = await Promise.allSettled([
    loadImage(coverSrc),
    loadImage("/icons/belog-wordmark.svg"),
    loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(BELOG_ICON_SVG)}`),
  ]);

  // 1. Shadow + white ticket shape
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.15)";
  ctx.shadowBlur = 10;
  ticketPath(ctx, ox, oy);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.restore();

  // 2. Clip to ticket shape, draw all content
  ctx.save();
  ticketPath(ctx, ox, oy);
  ctx.clip();

  // Logo row: py-5(20) + min-h-36 centered
  const logoY = oy + 32; // center 12px icon in 36px row: 20 + (36-12)/2 = 32
  const logoX = ox + 130; // (335 - (14+3+58)) / 2 = 130
  if (iconResult.status === "fulfilled") {
    ctx.drawImage(iconResult.value, logoX, logoY, 14, 12);
  }
  if (wordmarkResult.status === "fulfilled") {
    ctx.drawImage(wordmarkResult.value, logoX + 17, logoY, 58, 12);
  }

  // Cover image: y=61, h=169
  const coverY = oy + 61;
  ctx.fillStyle = "#F7F8F9";
  ctx.fillRect(ox, coverY, W, 169);
  if (coverResult.status === "fulfilled") {
    ctx.save();
    ctx.beginPath();
    ctx.rect(ox, coverY, W, 169);
    ctx.clip();
    drawImageCover(ctx, coverResult.value, ox, coverY, W, 169);
    ctx.restore();
  }

  ctx.restore(); // end clip

  // 3. Text content (outside clip so we can draw freely)
  // Re-clip just for safety (text stays within ticket bounds anyway)
  ctx.save();
  ticketPath(ctx, ox, oy);
  ctx.clip();

  const PX = 16;
  const TEXT_MAX_W = W - PX * 2;
  let cy = oy + 250; // content start: 61+169+20

  // Meeting name
  ctx.fillStyle = COLOR_BLACK;
  ctx.font = `600 18px ${PRE}, sans-serif`;
  const nameLines = wrapText(ctx, ticket.meetingName, TEXT_MAX_W, 2);
  for (const line of nameLines) {
    ctx.fillText(line, ox + PX, cy);
    cy += 22;
  }

  // Memory
  if (ticket.memory) {
    cy += 16; // mt-4
    ctx.font = `400 12px ${PTS}, "PT Sans Narrow", sans-serif`;
    const memLines = wrapText(ctx, ticket.memory, TEXT_MAX_W, 2);
    for (const line of memLines) {
      ctx.fillText(line, ox + PX, cy);
      cy += 20;
    }
  }

  // Date / Location
  cy += 30; // mt-[30px]
  const colW = W / 2;
  ctx.font = `500 12px ${PRE}, sans-serif`;
  ctx.fillStyle = COLOR_BLACK;
  ctx.fillText("Date", ox + PX, cy);
  if (ticket.location) ctx.fillText("Location", ox + PX + colW, cy);
  cy += 22;

  ctx.font = `400 15px ${PTS}, "PT Sans Narrow", sans-serif`;
  const dateText =
    ticket.startDate === ticket.endDate
      ? ticket.startDate
      : `${ticket.startDate} - ${ticket.endDate}`;

  const dateLines = wrapText(ctx, dateText, colW - PX, 2);
  const locLines = ticket.location ? wrapText(ctx, ticket.location, colW - PX, 2) : [];
  const dateLocRows = Math.max(dateLines.length, locLines.length);

  for (let i = 0; i < dateLocRows; i++) {
    if (dateLines[i]) ctx.fillText(dateLines[i], ox + PX, cy + i * 22);
    if (locLines[i]) ctx.fillText(locLines[i], ox + PX + colW, cy + i * 22);
  }
  cy += dateLocRows * 22;

  // Members
  if ((ticket.members?.length ?? 0) > 0) {
    cy += 30; // mt-[30px]
    ctx.font = `500 12px ${PRE}, sans-serif`;
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText("Member", ox + PX, cy);
    cy += 22;

    ctx.font = `400 12px ${PTS}, "PT Sans Narrow", sans-serif`;
    const CHIP_H = 22; // 12px font + 5px*2 padding
    const GAP = 6;
    let chipX = ox + PX;

    for (const member of (ticket.members ?? [])) {
      const text = `@${member.nickname}`;
      const chipW = ctx.measureText(text).width + 8 * 2;
      if (chipX + chipW > ox + W - PX) {
        chipX = ox + PX;
        cy += CHIP_H + GAP;
      }
      drawChip(ctx, text, chipX, cy);
      chipX += chipW + GAP;
    }
  }

  ctx.restore();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("canvas.toBlob failed"))),
      "image/png",
    );
  });
}
