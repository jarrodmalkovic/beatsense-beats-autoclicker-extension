const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getElement = async (query) => {
  let element;
  while (true) {
    element = document.querySelector(query);
    if (element && !element.textContent.includes('undefined')) return element;
    await sleep(250);
  }
}

const getTimeUntilFreeBeats = async () => {
  const hourlyBeatsTimer = await getElement('#hourlyBeatsTimer');
  const [minutes, seconds] = hourlyBeatsTimer.textContent.split(':');
  const timeLeftInSeconds = (minutes * 60) + (seconds * 1);
  return timeLeftInSeconds;
}

const clickBeats = async () => {
  const clickBeatsButton = await getElement('button .ng-scope');
  clickBeatsButton.click();
}

(async () => {
  console.log('BeatSense Beat Autoclicker has started...');

  const timeUntilFreeBeats = await getTimeUntilFreeBeats();
  await sleep(timeUntilFreeBeats * 1000);

  clickBeats();
  setInterval(() => {
    clickBeats();
  }, 60 * 60 * 1000);
})();