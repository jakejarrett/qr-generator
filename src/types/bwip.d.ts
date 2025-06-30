export * from 'bwip-js';

declare module "bwip-js" {
    export function toSVG(opts: RenderOptions): string;
}