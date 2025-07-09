const useCDNPath = (cdnUrl?: string, suffix?: string) => {
  const generateFileUrl = (fileName?: string) => {
    if (!cdnUrl || !suffix || !fileName) return void 0;
    return `${cdnUrl}/${fileName}.${suffix}`;
  };

  return {
    generateFileUrl,
  };
};

export default useCDNPath;
