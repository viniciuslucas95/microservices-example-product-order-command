import IExchangePublisher from '../../../infra/queue/shared/IExchangePublisher';
import ProductOrderedEvent from './ProductOrderedEvent';

export default interface IProductOrderedExchangePublish
  extends IExchangePublisher<ProductOrderedEvent> {}
