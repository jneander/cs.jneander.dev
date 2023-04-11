import {
  ArrayMatch,
  Chromosome,
  Fitness,
  randomChromosome,
  replaceOneGene,
  sampleArray,
} from '@jneander/genetics'
import {Store} from '@jneander/utils-state'

import {BaseController, PropagationOptions, PropagationTarget, State} from '../shared'

const defaultLength = 50
const geneSet = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!.'.split('')

function randomTarget(fitnessMethod: ArrayMatch<string>): PropagationTarget<string, number> {
  const genes = sampleArray(geneSet, defaultLength)

  const chromosome = new Chromosome<string>(genes)

  return {
    chromosome,
    fitness: fitnessMethod.getTargetFitness(chromosome),
  }
}

export class Controller extends BaseController<string, number> {
  private fitnessMethod: ArrayMatch<string>

  constructor() {
    const optimalFitness = new ArrayMatch<string>()

    const store = new Store<State<string, number>>({
      allIterations: false,
      best: null,
      current: null,
      first: null,
      isRunning: false,
      iterationCount: 0,
      maxPropagationSpeed: true,
      playbackPosition: 1,
      propagationSpeed: 1,
      target: randomTarget(optimalFitness),
    })

    super(store)

    this.fitnessMethod = optimalFitness
  }

  protected geneSet(): string[] {
    return geneSet
  }

  protected generateParent(): Chromosome<string> {
    const {chromosome} = this.target()

    if (chromosome == null) {
      throw new Error('Chromosome must exist on the target')
    }

    return randomChromosome(chromosome.genes.length, geneSet)
  }

  protected propogationOptions(): PropagationOptions<string> {
    return {
      mutate: parent => replaceOneGene(parent, this.geneSet()),
    }
  }

  protected randomTarget(): PropagationTarget<string, number> {
    const genes = sampleArray(this.geneSet(), defaultLength)

    const chromosome = new Chromosome<string>(genes)

    return {
      chromosome,
      fitness: this.fitnessMethod.getTargetFitness(chromosome),
    }
  }

  protected getFitness(chromosome: Chromosome<string>): Fitness<number> {
    const {chromosome: targetChromosome} = this.target()

    if (targetChromosome == null) {
      throw new Error('Chromosome must exist on the target')
    }

    return this.fitnessMethod.getFitness(chromosome, targetChromosome)
  }
}
