export function downloadTrigger(fileName, download) {
  const downloadTrigger = document.createElement('a');
  downloadTrigger.setAttribute('download', fileName);
  downloadTrigger.setAttribute('href', download);
  downloadTrigger.click();
  document.body.append(downloadTrigger)
}
