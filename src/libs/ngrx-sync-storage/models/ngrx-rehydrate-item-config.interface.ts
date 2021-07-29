export interface NgRxRehydrateItemConfig {
  /**
   * Keys that should be saved after rehydration
   */
  excludeKeys?: string[];

  /**
   * Scope of keys for rehydration.
   * Note this option has highest priority and will remove excluded keys if they are the same.
   */
  rehydrateKeys?: string[];
}
