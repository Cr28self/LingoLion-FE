type ConversationLayoutProps = {
  children: React.ReactNode;
};

const ConversationLayout = ({ children }: ConversationLayoutProps) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden font-sans">
      {/* Added overflow-hidden */}
      {children}
    </div>
  );
};

export default ConversationLayout;
