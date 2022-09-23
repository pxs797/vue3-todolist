import * as layout from '../layout'

export function installLayout(app: any): void {
  for (const key in layout) {
    app.component(key, layout[key as keyof typeof layout])
  }
}