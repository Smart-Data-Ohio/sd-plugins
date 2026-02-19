// pptxgenjs uses namespace+class export pattern incompatible with InstanceType.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pptx = any;

export interface SlideTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  contentAreas: ContentArea[];
  render: (pptx: Pptx, data: Record<string, unknown>) => void;
}

export interface ContentArea {
  name: string;
  type: "text" | "bullets" | "table" | "image-placeholder";
  required: boolean;
  description: string;
}

export interface PresentationRequest {
  title: string;
  outputPath: string;
  slides: SlideRequest[];
}

export interface SlideRequest {
  templateId: string;
  data: Record<string, unknown>;
}
