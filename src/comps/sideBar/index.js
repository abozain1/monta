import styles from "./sideBar.module.css";

const Sidebar = ({
  conversations,
  currentConversation,
  setCurrentConversation,
  addConversation,
  deleteConversation,
}) => {
  return (
    <div className={styles.sidebarContainer}>
      <h2>Conversations</h2>
      <ul>
        {Object.keys(conversations).map((name) => (
          <li key={name}>
            <span
              onClick={() => setCurrentConversation(name)}
              className={name === currentConversation ? styles.active : ""}
            >
              {name}
            </span>
            <button
              className={styles.delete}
              onClick={() => deleteConversation(name)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={addConversation}
          className={styles.addConversationButton}
        >
          Add Conversation
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
