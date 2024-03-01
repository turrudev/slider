import React, {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, css} from 'aphrodite';
import ThemeContext, {ThemeContextResult} from "../contexts/ThemeContext";

interface CustomSliderProps {
    min: number;
    max: number;
    initialValue: number;
    onChange: (value: number) => void;
    width?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({min, max, initialValue, onChange, width}) => {
    const [value, setValue] = useState(initialValue),
        [isDragging, setIsDragging] = useState(false),
        {theme} = useContext<ThemeContextResult>(ThemeContext),
        sliderRef = useRef<HTMLDivElement>(null),
        styles = StyleSheet.create({
            sliderContainer: {
                position: 'relative',
                height: '20px',
                cursor: 'pointer',
                outline: 'none'
            },
            sliderTrack: {
                background: theme.track,
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '4px',
                width: '100%',
                borderRadius: '2px'
            },
            sliderThumb: {
                background: theme.thumb,
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                cursor: 'grab',
                left: 'var(--thumb-initial-left, 0px)'
            },
        });

    useEffect(() => {
        if (!sliderRef.current) return;

        const sliderRect = sliderRef.current.getBoundingClientRect(),
            thumbWidth = sliderRef.current.querySelector('.thumb')?.clientWidth || 0,
            initialLeft = ((value - min) / (max - min)) * (sliderRect.width - thumbWidth);

        sliderRef.current.style.setProperty('--thumb-initial-left', `${initialLeft}px`);
    }, [value, min, max]);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging || !sliderRef.current) return;

            const sliderRect = sliderRef.current.getBoundingClientRect(),
                thumbWidth = sliderRef.current.querySelector('.thumb')?.clientWidth || 0,
                offsetX = event.clientX - sliderRect.left;

            let newValue = Math.round((offsetX / (sliderRect.width - thumbWidth)) * (max - min) + min);
            newValue = Math.min(Math.max(newValue, min), max);

            setValue(newValue);
            onChange(newValue);
        };

        function onMouseUp(): void {
            setIsDragging(false);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging, max, min, onChange]);

    function onMouseDown(): void {
        setIsDragging(true);
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
        if (!sliderRef.current) return;

        let newValue = value;
        const increment = 1;

        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
                event.preventDefault();
                newValue = Math.max(min, value - increment);
                break;
            case 'ArrowRight':
            case 'ArrowUp':
                event.preventDefault();
                newValue = Math.min(max, value + increment);
                break;
            default:
                return;
        }

        setValue(newValue);
        onChange(newValue);
    }

    return (
        <div
            className={css(styles.sliderContainer)}
            ref={sliderRef}
            onMouseDown={onMouseDown}
            onKeyDown={onKeyDown}
            style={{width}}
            tabIndex={0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={`${value}`}
        >
            <div className={css(styles.sliderTrack)}/>
            <div className={`${css(styles.sliderThumb)} thumb`}/>
        </div>
    );
};

export default CustomSlider;
