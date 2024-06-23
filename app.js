import { baseLayerLuminance, StandardLuminance } from 'https://unpkg.com/@fluentui/web-components';

const LISTING_URL = "https://facs01-01.github.io/FACS-VPM-Listing/index.json";

const setTheme = () => {
  const isDarkTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDarkTheme()) {
    baseLayerLuminance.setValueFor(document.documentElement, StandardLuminance.DarkMode);
  } else {
    baseLayerLuminance.setValueFor(document.documentElement, StandardLuminance.LightMode);
  }
}

(() => {
  setTheme();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    setTheme();
  });

  const urlBarHelpButton = document.getElementById('urlBarHelp');
  const addListingToVccHelp = document.getElementById('addListingToVccHelp');
  urlBarHelpButton.addEventListener('click', () => {
    addListingToVccHelp.hidden = false;
  });
  const addListingToVccHelpClose = document.getElementById('addListingToVccHelpClose');
  addListingToVccHelpClose.addEventListener('click', () => {
    addListingToVccHelp.hidden = true;
  });

  const vccAddRepoButton = document.getElementById('vccAddRepoButton');
  vccAddRepoButton.addEventListener('click', () => window.location.assign(`vcc://vpm/addRepo?url=${encodeURIComponent(LISTING_URL)}`));

  const vccUrlFieldCopy = document.getElementById('vccUrlFieldCopy');
  vccUrlFieldCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(LISTING_URL);
    vccUrlFieldCopy.appearance = 'accent';
    setTimeout(() => {
      vccUrlFieldCopy.appearance = 'neutral';
    }, 1000);
  });

})();
