import React from "react";
import Button from "../../UI/Button";
import sizes from "../../../constants/sizes";
import PauseIconSVG from "../../../assets/pauseIcon.svg";
import PlayIconSVG from "../../../assets/playIcon.svg";

const PausePlayButton = (props) => {
    return (
        <Button
            icon={
                !props.isPaused ? (
                    <PauseIconSVG
                        width={sizes.pauseResumeButtonSizes}
                        height={sizes.pauseResumeButtonSizes}
                    />
                ) : (
                    <PlayIconSVG
                        width={sizes.pauseResumeButtonSizes}
                        height={sizes.pauseResumeButtonSizes}
                    />
                )
            }
            onPress={props.onPauseToggle}
        />
    );
};

export default PausePlayButton;
