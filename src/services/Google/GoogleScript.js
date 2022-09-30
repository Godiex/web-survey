// eslint-disable-next-line import/prefer-default-export
export const removeGoogleMapScript = () => {
  const keywords = ["maps.googleapis"];

  const scripts = document.getElementsByTagName("script");

  // eslint-disable-next-line no-plusplus
  for (let i = scripts.length - 1; i >= 0; i--) {
    const scriptSource = scripts[i].getAttribute("src");
    if (scriptSource) {
      if (keywords.filter((item) => scriptSource.includes(item)).length) {
        scripts[i].remove();
      }
    }
  }
};
