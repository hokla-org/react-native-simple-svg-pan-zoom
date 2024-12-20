import React, { Component } from 'react';
import { PanResponderInstance, Animated, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Point, ViewTransform, ViewDimensions } from './interfaces';
/*********************************************************
 * Interfaces
 *********************************************************/
export type Props = React.PropsWithChildren<{
    minScale?: number;
    maxScale?: number;
    initialZoom?: number;
    canvasHeight?: number;
    canvasWidth?: number;
    canvasStyle?: ViewStyle;
    viewStyle?: ViewStyle;
    onZoom?: (zoom: number) => void;
    disabled?: boolean;
}> & SvgProps;
export interface State {
    layoutKnown: boolean;
    viewDimensions: ViewDimensions;
    viewTransform: ViewTransform;
    isScaling: boolean;
    initialDistance: number;
    initialTransform: ViewTransform;
    initialScale: number;
    initialTranslation: Point;
    isMoving: boolean;
    initialGestureState: {
        dx: number;
        dy: number;
    };
    scaleAnimation: Animated.Value;
    TranslationAnimation: Animated.ValueXY;
}
/*********************************************************
 * Component
 *********************************************************/
export default class SvgPanZoom extends Component<Props, State> {
    static defaultProps: Partial<Props>;
    mainViewRef: any;
    prInstance: PanResponderInstance;
    prTargetSelf: any;
    prTargetOuter: any;
    constructor(props: Props);
    dropNextEvt: number;
    UNSAFE_componentWillMount(): void;
    render(): React.JSX.Element;
    _onLayout: (event: any) => void;
    getInitialViewTransform(canvasWidth: number, canvasHeight: any, scale: number): ViewTransform;
    resetZoom: (duration?: number | undefined) => void;
    zoomToPoint: (x: number, y: number, scale: number, duration?: number) => void;
    processPinch: (x1: any, y1: any, x2: any, y2: any) => void;
    processTouch: (gestureState: any) => void;
}
