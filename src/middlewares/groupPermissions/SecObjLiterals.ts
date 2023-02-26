import { consultPermissions } from "./consultPermissions";

class SecObjLeterals {
  private async Func(user: number, route: string) {

    const consult = new consultPermissions();
    const result = await consult.permissionDB({ user, route });
    return result;

  }
  constructor() {}

  public get Controllers(): object {
    return {
      user_create: this.Func,
      user_index: this.Func,
      user_indexall: this.Func,
      user_update: this.Func,
      user_delete: this.Func,
    };
  }
}

export { SecObjLeterals };
