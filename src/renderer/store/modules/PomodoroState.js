const state = {
  workRoundInSeconds: 1500,
  shortBreakInSeconds: 300,
  longBreakInSeconds: 1200,
  currentIteration: 1,
  currentSlotName: 'work', // work, short-break, long-break
  isTimerStarted: false,
  isPromptingNextSlot: false,
  minimizedWindowPosition: [100, 100]
}

const mutations = {
  START_TIMER (state) {
    state.isTimerStarted = true
  },
  PAUSE_TIMER (state) {
    state.isTimerStarted = false
  },
  MOVE_TO_NEXT_SLOT (state) {
    state.isPromptingNextSlot = false
    state.currentIteration++
    if (state.currentSlotName === 'work' && state.currentIteration % 8 !== 0) {
      state.currentSlotName = 'short-break'
    } else if (state.currentSlotName === 'work' && state.currentIteration % 8 === 0) {
      state.currentSlotName = 'long-break'
    } else {
      state.currentSlotName = 'work'
    }
    if (state.currentIteration > 16) {
      state.currentIteration = 1
    }
  },
  PROMPT_NEXT_SLOT (state) {
    state.isPromptingNextSlot = true
  },
  SET_MINIMZED_POSITION (state, coordinates) {
    state.minimizedWindowPosition = coordinates
  }
}

const actions = {
  startTimer ({ commit }) {
    commit('START_TIMER')
  },
  pauseTimer ({ commit }) {
    commit('PAUSE_TIMER')
  },
  moveToNextSlot ({ commit }) {
    commit('MOVE_TO_NEXT_SLOT')
  },
  promptNextSlot ({commit}) {
    commit('PROMPT_NEXT_SLOT')
  },
  setMinimizedPosition ({ commit }, coordinates) {
    commit('SET_MINIMZED_POSITION', coordinates)
  }
}

const getters = {
  currentTimerValue () {
    switch (state.currentSlotName) {
      case 'work':
        return state.workRoundInSeconds
      case 'short-break':
        return state.shortBreakInSeconds
      case 'long-break':
        return state.longBreakInSeconds
      default:
        return 1500
    }
  },
  currentSlotName () {
    return state.currentSlotName
  },
  workRoundInSeconds () {
    return state.workRoundInSeconds
  },
  shortBreakInSeconds () {
    return state.shortBreakInSeconds
  },
  longBreakInSeconds () {
    return state.shortBreakInSeconds
  },
  isTimerInProgress () {
    return state.isTimerStarted
  },
  getCurrentIteration () {
    return state.currentIteration
  },
  isPromptingNextSlot () {
    return state.isPromptingNextSlot
  },
  getMinimizedPosition () {
    return {
      x: state.minimizedWindowPosition[0],
      y: state.minimizedWindowPosition[1]
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
