import {
  Chromosome,
  Fitness,
  randomChromosome,
  randomInt,
  replaceOneGene,
  swapTwoGenes
} from '@jneander/genetics'

import {BaseController, PropagationOptions, PropagationTarget} from '../shared'
import SumProductMatch from './SumProductMatch'
import {CardSplittingChromosome, CardSplittingFitnessValue} from './types'

const geneSet = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10']

function mutate(parent: CardSplittingChromosome, geneSet: string[]) {
  if (parent.genes.length === new Set(parent.genes).size) {
    return swapTwoGenes(parent, randomInt(1, 4))
  }

  return replaceOneGene(parent, geneSet)
}

export default class Controller extends BaseController<
  string,
  CardSplittingFitnessValue
> {
  private _fitnessMethod: SumProductMatch | undefined

  protected geneSet(): string[] {
    return geneSet
  }

  protected generateParent(): CardSplittingChromosome {
    return randomChromosome(10, geneSet)
  }

  protected propogationOptions(): PropagationOptions<string> {
    return {
      mutate: (parent: CardSplittingChromosome) =>
        mutate(parent, this.geneSet())
    }
  }

  protected randomTarget(): PropagationTarget<
    string,
    CardSplittingFitnessValue
  > {
    return {
      fitness: this.fitnessMethod.getTargetFitness()
    }
  }

  protected getFitness(
    chromosome: CardSplittingChromosome
  ): Fitness<CardSplittingFitnessValue> {
    return this.fitnessMethod.getFitness(chromosome)
  }

  protected get fitnessMethod() {
    if (this._fitnessMethod == null) {
      this._fitnessMethod = new SumProductMatch()
    }

    return this._fitnessMethod
  }
}
