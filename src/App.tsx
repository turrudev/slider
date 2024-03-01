import React, {useContext, useEffect, useState} from 'react';
import TranslationsManager from "./utils/TranslationsManager";
import {StyleSheet, css} from 'aphrodite';
import GridUtils from "./utils/GridUtils";
import ThemeContext, {ThemeContextResult} from "./contexts/ThemeContext";
import Slider from "./components/Slider";

const App = () => {
    const [sliderValue, setSliderValue] = useState(0),
        documentTitle: string = TranslationsManager.getMessage("appTitle"),
        {theme} = useContext<ThemeContextResult>(ThemeContext),
        styles = StyleSheet.create({
            app: {
                ...GridUtils.define("max-content max-content max-content", "auto"),
                backgroundColor: theme.appBackground,
                gridRowGap: 15,
                justifyContent: "center",
                height: "100vmax",
                color: theme.appText,
                textAlign: "center"
            },
            header: GridUtils.setRowCol(1, 1),
            sliderValue: GridUtils.setRowCol(2, 1)
        });

    useEffect(() => {
        function setDocumentTitle(): void {
            document.title = documentTitle;
        }

        setDocumentTitle();
    }, [documentTitle]);

    function onSliderChange(newValue: number): void {
        setSliderValue(newValue);
    }

    return (
        <div className={css(styles.app)}>
            <h1 className={css(styles.header)}>{documentTitle}</h1>
            <h3 className={css(styles.sliderValue)}>{sliderValue}</h3>
            <Slider min={-100} max={100} initialValue={sliderValue} onChange={onSliderChange} width={"300px"}/>
        </div>
    );
}

export default App;
