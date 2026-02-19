import type { SlideInfo, ShapeInfo, PresentationInfo } from "./types.js";
declare function getAccessToken(): Promise<string>;
export declare function getPresentation(
  presentationId: string,
): Promise<PresentationInfo>;
export declare function listSlides(
  presentationId: string,
): Promise<SlideInfo[]>;
export declare function getSlideContent(
  presentationId: string,
  slideIndex: number,
): Promise<ShapeInfo[]>;
export declare function batchUpdate(
  presentationId: string,
  requests: unknown[],
): Promise<unknown>;
export { getAccessToken };
