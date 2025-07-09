const useCDNPath = (cdnUrl: string, suffix: string) => {
  const generateFileUrl = (fileName: string) => {
    if (!cdnUrl || !suffix) return "";
    return `${cdnUrl}/${fileName}.${suffix}`;
  };

  return {
    generateFileUrl,
  };
};

export default useCDNPath;
