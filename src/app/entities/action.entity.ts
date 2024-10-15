export interface ActionEntity {
  name: string,
  content: string | null,
  type: 'template' | 'custom'
}