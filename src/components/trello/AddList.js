import React, { Component } from "react";
import { connect } from "react-redux";
import ListEditor from "./ListEditor";
import shortid from "shortid";
import { addList } from "../../actions/list";
import EditButtons from "./EditButtons";

class AddList extends Component {
  state = {
    title: "",
  };

  handleChangeTitle = (e) => this.setState({ title: e.target.value });

  createList = async () => {
    const { title } = this.state;
    this.props.toggleAddingList();
    this.props.addList({ listId: shortid.generate(), listTitle: title });
  };

  render() {
    const { toggleAddingList } = this.props;
    const { title } = this.state;

    return (
      <div className="add-list-editor">
        <ListEditor
          title={title}
          handleChangeTitle={this.handleChangeTitle}
          onClickOutside={toggleAddingList}
          saveList={this.createList}
        />

        <EditButtons
          handleSave={this.createList}
          saveLabel={"Add list"}
          handleCancel={toggleAddingList}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addList: (payload) => dispatch(addList(payload)),
});

export default connect(undefined, mapDispatchToProps)(AddList);
