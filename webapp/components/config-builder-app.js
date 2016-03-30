'use strict';
const connect = require('react-redux').connect;
const ConfigBuilder = require('./config-builder');
const actions = require('../actions');

const mapStateToProps = state => ({
    configEncoded: state.config.encoded,
    mockUrl: state.mockUrl,
    persistentUrl: state.persistentUrl
});

const mapDispatchToProps = (dispatch) => ({
    onConfigInput: value => dispatch(actions.typeInConfig(value)),
    requestPersistentURL: configEncoded => dispatch(actions.requestPersistentURL(configEncoded))
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
    Object.assign({}, ownProps, stateProps, dispatchProps, {
        requestPersistentURL: () => dispatchProps.requestPersistentURL(stateProps.configEncoded)
    });

const ConfigBuilderApp = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(ConfigBuilder);

module.exports = ConfigBuilderApp;