import React, { useEffect, useReducer, useRef } from "react";

function getCurrentTime() {
    return new Date().getTime();
}

function timeReducer(state, action) {
    switch (action.msg) {
        case "pause":
            return {
                ...state,
                timerActive: false,
                previousTime:
                    state.previousTime + (getCurrentTime() - state.lastResume),
            };

        case "resume":
            const timeVal = getCurrentTime();
            return {
                ...state,
                timerActive: true,
                lastResume: timeVal,
                currentTime: timeVal,
            };

        case "reset":
            return {
                ...state,
                timerActive: false,
                previousTime: 0,
            };

        case "tick":
            return {
                ...state,
                currentTime: getCurrentTime(),
            };
    }
}

function useTimer() {
    const initialTime = getCurrentTime();
    const finalTimeRef = useRef();
    const [time, dispatchTime] = useReducer(timeReducer, {
        timerActive: false,
        previousTime: 0,
        currentTime: initialTime,
        lastResume: initialTime,
    });

    useEffect(() => {
        let interval = null;
        if (time.timerActive) {
            interval = setInterval(() => {
                dispatchTime({ msg: "tick" });
            }, 1000);
        }

        // Cleanup
        return () => {
            if (interval) {
                clearTimeout(interval);
            }
        };
    }, [time.timerActive]);

    // Timer event handler
    const pauseTimerHandler = () => {
        dispatchTime({ msg: "pause" });
    };
    const resumeTimerHandler = () => {
        dispatchTime({ msg: "resume" });
    };
    const resetTimerHandler = () => {
        dispatchTime({ msg: "reset" });
    };

    // Compute times, only if timer is active
    if (finalTimeRef.current) {
        finalTimeRef.current = {
            ...finalTimeRef.current,
            isActive: time.timerActive,
        };
    } else {
        // intitial state
        finalTimeRef.current = {
            resumeTimer: resumeTimerHandler,
            pauseTimer: pauseTimerHandler,
            resetTimer: resetTimerHandler,
            time: 0,
            isActive: false,
        };
    }

    if (time.timerActive) {
        const totalTimeMS =
            time.previousTime + (time.currentTime - time.lastResume);
        const totalTimeSec = Math.round(totalTimeMS / 1000);

        finalTimeRef.current.time = totalTimeSec;
    }

    return finalTimeRef.current;
}

export default useTimer;
