import React from "react";
import { ListItem } from "@material-ui/core";

class ChatItem extends React.Component {
  render() {
    const { message, email } = this.props;
    const isOwnMessage = message.author === email;

    return (
      <ListItem style={styles.listItem(isOwnMessage)}>
        <div style={styles.author}>{message.author}</div>
        <div style={styles.container(isOwnMessage)}>
          {message.body}
          <div style={styles.timestamp}>
            {new Date(message.dateCreated.toISOString()).toLocaleString()}
          </div>
        </div>
      </ListItem>
    );
  }
}

const styles = {
  listItem: (isOwnMessage) => ({
    flexDirection: "column",
    alignItems: isOwnMessage ? "flex-end" : "flex-start",
  }),
  container: (isOwnMessage) => ({
    maxWidth: "75%",
    borderRadius: 12,
    padding: 16,
    color: "white",
    fontSize: 12,
    backgroundColor: isOwnMessage ? "#4f1390" : "rgb(5 21 52)",
  }),
  author: { fontSize: 14, color: "black" },
  timestamp: { fontSize: 8, color: "white", textAlign: "right", paddingTop: 4 },
};

export default ChatItem;