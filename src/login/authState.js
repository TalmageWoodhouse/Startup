export class AuthState {
  static Unkown = new AuthState("unknown");
  static Authenticated = new AuthState("authenticated");
  static Unauthenticated = new AuthState("unauthenticated");

  constructor(name) {
    this.name = name;
  }
}
