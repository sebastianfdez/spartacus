import { Inject, Injectable, ViewContainerRef } from '@angular/core';
import {
  TriggerConfig,
  TriggerInlineMapping,
  TriggerOutletMapping,
  TriggerUrlMapping,
  TRIGGER_CALLER,
} from '../config/trigger-config';
import { RenderStrategy } from './render.strategy';

@Injectable({ providedIn: 'root' })
export class TriggerService {
  // Keep a list of rendered elements
  protected renderedCallers: TRIGGER_CALLER[] = [];

  constructor(
    @Inject(RenderStrategy)
    protected renderStrategies: RenderStrategy[],
    protected triggerConfig: TriggerConfig
  ) {
    this.renderStrategies = this.renderStrategies || [];
  }

  render(caller: TRIGGER_CALLER, vcr?: ViewContainerRef): void {
    const config = this.findConfiguration(caller);
    const renderer = this.getRenderStrategy(config);

    // Render if the strategy exists
    if (renderer) {
      renderer.render(config, caller, vcr);
    }
  }

  protected findConfiguration(
    caller: TRIGGER_CALLER
  ): TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping {
    return this.triggerConfig?.trigger[caller];
  }

  protected getRenderStrategy(
    config: TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping
  ): RenderStrategy {
    const strategies = this.renderStrategies.find(strategy =>
      strategy.isStrategyForConfiguration(config)
    );
    return strategies;
  }
}
