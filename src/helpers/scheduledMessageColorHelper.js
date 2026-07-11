const COLOR_CODES = ['$1', '$3', '$4'];
const COLOR_TOKEN_REGEX = /\$[134]/g;

function hasSameTokenBefore(text, index, token) {
  if (index < token.length) return false;
  return text.slice(index - token.length, index) === token;
}

function hasSameTokenAt(text, index, token) {
  return text.slice(index, index + token.length) === token;
}

function applyColorToken({ text, selectionStart, selectionEnd, token }) {
  const source = String(text || '');
  const start = Number.isInteger(selectionStart) ? selectionStart : source.length;
  const end = Number.isInteger(selectionEnd) ? selectionEnd : start;
  const safeStart = Math.max(0, Math.min(start, source.length));
  const safeEnd = Math.max(0, Math.min(end, source.length));
  const normalizedStart = Math.min(safeStart, safeEnd);
  const normalizedEnd = Math.max(safeStart, safeEnd);

  if (!COLOR_CODES.includes(token)) {
    return {
      value: source,
      selectionStart: normalizedStart,
      selectionEnd: normalizedEnd,
    };
  }

  if (
    hasSameTokenBefore(source, normalizedStart, token) ||
    hasSameTokenAt(source, normalizedStart, token)
  ) {
    return {
      value: source,
      selectionStart: normalizedStart,
      selectionEnd: normalizedEnd,
    };
  }

  const nextValue =
    source.slice(0, normalizedStart) + token + source.slice(normalizedStart);
  const nextSelectionStart = normalizedStart + token.length;
  const selectedLength = normalizedEnd - normalizedStart;

  return {
    value: nextValue,
    selectionStart: nextSelectionStart,
    selectionEnd: nextSelectionStart + selectedLength,
  };
}

function clearColorTokens({ text, selectionStart, selectionEnd }) {
  const source = String(text || '');
  const start = Number.isInteger(selectionStart) ? selectionStart : 0;
  const end = Number.isInteger(selectionEnd) ? selectionEnd : 0;
  const safeStart = Math.max(0, Math.min(start, source.length));
  const safeEnd = Math.max(0, Math.min(end, source.length));
  const normalizedStart = Math.min(safeStart, safeEnd);
  const normalizedEnd = Math.max(safeStart, safeEnd);
  const hasSelection = normalizedEnd > normalizedStart;

  if (!hasSelection) {
    const nextValue = source.replace(COLOR_TOKEN_REGEX, '');
    return {
      value: nextValue,
      selectionStart: 0,
      selectionEnd: 0,
    };
  }

  const before = source.slice(0, normalizedStart);
  const selected = source.slice(normalizedStart, normalizedEnd);
  const after = source.slice(normalizedEnd);
  const cleanedSelected = selected.replace(COLOR_TOKEN_REGEX, '');
  const nextValue = before + cleanedSelected + after;
  const nextSelectionStart = normalizedStart;
  const nextSelectionEnd = normalizedStart + cleanedSelected.length;

  return {
    value: nextValue,
    selectionStart: nextSelectionStart,
    selectionEnd: nextSelectionEnd,
  };
}

function parseColorSegments(rawMessage) {
  const message = String(rawMessage || '');
  if (!message) return [];

  const segments = [];
  let activeCode = '$1';
  let buffer = '';

  for (let i = 0; i < message.length; i += 1) {
    const maybeToken = message.slice(i, i + 2);
    if (COLOR_CODES.includes(maybeToken)) {
      if (buffer) {
        segments.push({ code: activeCode, text: buffer });
        buffer = '';
      }
      activeCode = maybeToken;
      i += 1;
      continue;
    }
    buffer += message[i];
  }

  if (buffer) {
    segments.push({ code: activeCode, text: buffer });
  }

  return segments;
}

export {
  COLOR_CODES,
  COLOR_TOKEN_REGEX,
  applyColorToken,
  clearColorTokens,
  parseColorSegments,
};
