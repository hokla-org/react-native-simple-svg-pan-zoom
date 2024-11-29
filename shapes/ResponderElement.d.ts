import React, { Component } from 'react';
export interface Props extends React.PropsWithChildren<{
    x: number;
    y: number;
    onClick?: (evt: any) => void;
    onClickRelease?: (evt: any) => void;
    onClickCanceled?: (evt: any) => void;
    onDrag?: (evt: any) => void;
}> {
}
export interface State {
}
export default class ResponderElement extends Component<Props, State> {
    static defaultProps: Partial<Props>;
    releasedNaturally: boolean;
    render(): React.JSX.Element;
}
