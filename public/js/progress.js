const STORAGE_KEY = 'birthday_progress_v1';

const defaultProgress = {
  wishes: true,
  gallery: false,
  music: false,
  quiz: false,
  closing: false
};

function cloneProgress(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return cloneProgress(defaultProgress);
  }

  try {
    return { ...cloneProgress(defaultProgress), ...JSON.parse(raw) };
  } catch (error) {
    return cloneProgress(defaultProgress);
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function unlockStep(step) {
  const progress = getProgress();
  progress[step] = true;
  saveProgress(progress);
}

function resetProgress() {
  saveProgress(cloneProgress(defaultProgress));
}