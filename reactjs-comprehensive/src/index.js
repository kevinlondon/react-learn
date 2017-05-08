var HelloUser = React.createClass({
    getInitialState: function() {
        return {
            username: '@tylermcginnis33'
        }
    },

    handleChange: function(e) {
        this.setState({
            username: e.target.value
        });
    },
    render: function() {
        return (
            <div>
                Hello {this.state.username}!
                Change Name: <input type="text" value={this.state.username} onChange={this.handleChange} />
            </div>
        )
    }
});


ReactDOM.render(<HelloUser />, document.getElementById('app'));
