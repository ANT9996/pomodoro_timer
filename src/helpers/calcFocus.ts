import {tDay} from "../types";

const calcFocus = (day : tDay): number => {
  if (day.pomodoros === 0) return 0
  return Math.round((day.time / (day.time + day.pauseTime)) * 100)
}

export default calcFocus