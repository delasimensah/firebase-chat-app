export const groupByDate = (messages) => {
  const newMessages = [];

  const groupedMessages = messages.reduce((acc, obj) => {
    const key = obj.createdAt;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(obj);

    return acc;
  }, {});

  for (const [key, value] of Object.entries(groupedMessages)) {
    const obj = { date: key, messages: value };
    newMessages.push(obj);
  }

  return newMessages;
};
