exports.format = function (msgs) {
  const results = [];
  for (const [id, msg] of Object.entries(msgs)) {
    results.push({
      id: id,
      defaultMessage: msg.defaultMessage,
      description: msg.description,
    });
  }
  return results;
};
