在PureComponent中使用shouldComponentUpdate

1.您将首先在开发环境中获取警告，因为React源代码检查以查看在处理PureComponent时是否定义了方法：

    if (
      isPureComponent(Component) &&
      typeof inst.shouldComponentUpdate !== 'undefined'
    ) {
      warning(
        false,
        '%s has a method called shouldComponentUpdate(). ' +
          'shouldComponentUpdate should not be used when extending React.PureComponent. ' +
          'Please extend React.Component if shouldComponentUpdate is used.',
        this.getName() || 'A pure component',
      );
    }

2.然后，在渲染时，如果定义了这个方法，它实际上会跳过，甚至不检查该组件是否是PureComponent并使用您自己的实现。

    if (inst.shouldComponentUpdate) {
      if (__DEV__) {
        shouldUpdate = measureLifeCyclePerf(
          () => inst.shouldComponentUpdate(nextProps, nextState, nextContext),
          this._debugID,
          'shouldComponentUpdate',
        );
      } else {
        shouldUpdate = inst.shouldComponentUpdate(
          nextProps,
          nextState,
          nextContext,
        );
      }
    } else {
      if (this._compositeType === ReactCompositeComponentTypes.PureClass) {
        shouldUpdate =
          !shallowEqual(prevProps, nextProps) ||
          !shallowEqual(inst.state, nextState);
      }
    }

因此，如果您实现自己的shouldComponentUpdate，它可能会覆盖PureComponent的浅层比较
