interface DeviceInfo {
  isMobile: boolean;
}

export const deviceInfo: DeviceInfo = {
  isMobile: Boolean(
    navigator &&
      navigator.userAgent &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ),
  ),
};
