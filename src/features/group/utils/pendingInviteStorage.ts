const PENDING_INVITE_CODE_KEY = "pending-invite-code";

// 초대 링크로 들어온 사용자가 로그인·회원가입을 마친 뒤 이어서 그룹에 참여하도록 코드를 보관
export function savePendingInviteCode(code: string) {
  try {
    localStorage.setItem(PENDING_INVITE_CODE_KEY, code);
  } catch {}
}

export function hasPendingInviteCode() {
  try {
    return localStorage.getItem(PENDING_INVITE_CODE_KEY) !== null;
  } catch {
    return false;
  }
}

export function takePendingInviteCode() {
  try {
    const code = localStorage.getItem(PENDING_INVITE_CODE_KEY);
    localStorage.removeItem(PENDING_INVITE_CODE_KEY);
    return code;
  } catch {
    return null;
  }
}
