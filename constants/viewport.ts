export type ViewportType = 'desktop' | 'mobile';

export const VIEWPORTS = {
  desktop: 'desktop' as ViewportType,
  mobile: 'mobile' as ViewportType,
};

export const viewportStyles = {
  desktop: 'w-full',
  mobile: 'w-full md:w-96',
};
