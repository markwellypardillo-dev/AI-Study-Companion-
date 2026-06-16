import { StudyGuideData, AssessmentQuestion, DifficultyTier } from "../types";

export interface PreloadedSubject {
  id: string;
  title: string;
  short: string;
  content: string;
  guide: StudyGuideData;
  assessments: {
    basic: AssessmentQuestion[];
    medium: AssessmentQuestion[];
    hard: AssessmentQuestion[];
  };
}

export const PRELOADED_SUBJECTS: PreloadedSubject[] = [
  {
    id: "biology-mitochondria",
    title: "Biology 101 - Cell Mitochondria & Respiration.txt",
    short: "Mitochondria structures, outer membranes, Krebs cycle, and ATP synthesis pathways.",
    content: `Mitochondria are double-membraned organelles found in most eukaryotic organisms. They generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy. Because of this, mitochondria are colloquially referred to as the "powerhouses of the cell."`,
    guide: {
      summary: "Mitochondria are the fundamental energy-converting organelles of eukaryotic cells, responsible for synthesizing adenosine triphosphate (ATP) via aerobic cellular respiration. Often termed the cellular 'powerhouses', they possess their own unique, circular DNA and are thought to have originated from ancient endosymbiotic bacteria. This study guide dives deep into their double-membraned architecture (outer membrane, inner cristae, intermembrane proton gradient space, and enzyme-rich internal matrix) and examines the primary stages of respiration: Glycolysis, the Citric Acid (Krebs) Cycle, and the Electron Transport Chain (ETC). Each section serves as a direct grounding point for conceptual and practical assessment recall.",
      sections: [
        {
          title: "Mitochondrial Structural Anatomy",
          content: "• Outer Membrane: Permeable barrier containing protein chambers called porins, facilitating transport of metabolites up to 5000 Daltons.\n• Inner Membrane: Highly selective barrier folded into dynamic shelves called cristae, which maximize the metabolic surface area for membrane proteins.\n• Intermembrane Space: Crucial fluid-filled corridor where actively pumped protons assemble to establish a heavy electrochemical potential gradient.\n• Matrix: The innermost central chamber housing ribosomes, circular mitochondrial DNA (mtDNA), and the dense enzymatic machinery of the Krebs cycle.",
          relevance: "Directly explains why structural disruption (e.g., pore rupture) leads to energetic deficits or rapid cell death."
        },
        {
          title: "The Mechanics of Cellular Respiration",
          content: "• Glycolysis: Originates in the cell's anaerobic cytoplasm, breaking one molecule of glucose down into two pyruvates, yielding an input-to-output gain of +2 Net ATP and 2 NADH.\n• Krebs Cycle (Citric Acid Cycle): Occurs exclusively within the alkaline matrix, processing Acetyl-CoA to yield Carbon Dioxide as waste, alongside +2 ATP, 6 NADH, and 2 FADH2 electron carriers.\n• Oxidative Phosphorylation: Driven by the Electron Transport Chain (ETC). Protons are pumped out to create a gradient. This proton momentum surges back into the matrix through ATP Synthase rotors, synthesizing approximately 28 to 32 ATP molecules.",
          relevance: "The principal chemical metabolic chain yielding energy in all eukaryotic organisms."
        }
      ],
      keyConcepts: [
        {
          concept: "Proton-Motive Force & Chemiosmosis",
          explanation: "Chemiosmosis is the structural movement of ions (protons, H+) down their concentration gradient across a selectively permeable membrane, similar to water flowing through a dam. The active pumping of these protons via high-energy electrons in the ETC builds a specialized electrical charge and chemical concentration difference called the proton-motive force, which powers the ATP Synthase rotor.",
          importance: "It acts as the central mechanism enabling high-yield ATP generation, transcending simple substrate-level phosphorylation."
        },
        {
          concept: "Endosymbiotic Hypothesis",
          explanation: "Mitochondria were once free-living alpha-proteobacteria that were engulfed by ancestral anaerobic eukaryotic hosts millions of years ago. Over generations, this mutual relationship became obligate, leaving mitochondria with their own circular mtDNA and bacterial-sized ribosomes.",
          importance: "Explains why mitochondria possess distinct genetic machinery separate from the cell nucleus."
        }
      ],
      vocabulary: [
        { term: "ATP Synthase", definition: "A sophisticated turbine-like mitochondrial enzyme that utilizes the kinetic cascade of proton flow to catalyze the phosphorylation of ADP into ATP." },
        { term: "Cristae", definition: "Deep invaginations or folds of the inner mitochondrial membrane that greatly increase surface area for cellular respiration." },
        { term: "mtDNA", definition: "Mitochondrial DNA; the circular genome passed on from maternal lineages encoding essential respiration components." },
        { term: "Porins", definition: "Beta-barrel proteins in the outer membrane forming large channels to easily let small metabolites diffuse." }
      ],
      flashcards: [
        { front: "What is colloquially known as the powerhouse of the cell?", back: "The Mitochondrion, due to its high capacity for synthesizing ATP." },
        { front: "Where does the Citric Acid (Krebs) Cycle take place?", back: "Inside the inner mitochondrial matrix chamber." },
        { front: "Which membrane houses the Electron Transport Chain?", back: "The inner mitochondrial membrane (specifically within the Cristae folds)." },
        { front: "What is the primary role of Porins in outer membranes?", back: "To allow unassisted diffusion of nutrients and molecules up to 5,000 Daltons." }
      ]
    },
    assessments: {
      basic: [
        {
          id: "bio-b1",
          type: "mcq",
          question: "Which component of the mitochondrion contains highly folded cristae to maximize respiration surface areas?",
          options: ["Outer Membrane", "Inner Membrane", "Matrix", "Intermembrane Space"],
          correctAnswer: "Inner Membrane",
          explanation: "The inner membrane is intricately folded into shelves called cristae to provide ample surface area for embedding ETC proteins."
        },
        {
          id: "bio-b2",
          type: "tf",
          question: "Mitochondria contain their own circular DNA (mtDNA) and double-membraned structure.",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Mitochondria possess circular genomes and dual membranes, aligning with their endosymbiotic origins."
        }
      ],
      medium: [
        {
          id: "bio-m1",
          type: "fib",
          question: "The chemical engine that utilizes the cascade of proton flow to convert ADP into ATP is called __.",
          correctAnswer: "ATP Synthase",
          explanation: "ATP Synthase operates as a tiny molecular motor driven by the electrochemical proton gradient."
        },
        {
          id: "bio-m2",
          type: "short",
          question: "Briefly explain why the intermembrane space has a high concentration of protons (H+) during active respiration.",
          correctAnswer: "Protons are actively pumped into the intermembrane space by protein complexes of the Electron Transport Chain.",
          explanation: "The ETC utilizes energy from NADH/FADH2 electron transfers to pump H+ out of the matrix into the intermembrane corridor."
        }
      ],
      hard: [
        {
          id: "bio-h1",
          type: "essay",
          question: "Analyze the energetic consequences of a poison that blocks complex IV of the electron transport chain, specifically addressing ATP output, NADH levels, and the proton gradient.",
          sampleAnswer: "Blocking complex IV halts electron flow along the ETC. Consequently, NADH can no longer donate electrons to complex I, raising NADH concentrations. Proton pumping stops, neutralizing the proton-motive force and depleting the proton gradient. Chemiosmosis grinds to a halt, leaving the cell unable to synthesize ATP via oxidative phosphorylation, leading to rapid cell death.",
          gradingCriteria: "• Explains stoppage of electron flow.\n• Identifies loss of proton pumping and collapse of proton-motive gradient.\n• Links collapsed gradient to failure of ATP Synthase synthesis.",
          explanation: "Without active electron flow to oxygen via Complex IV, the inner membrane potential collapses, stopping chemiospotic ATP synthesis."
        }
      ]
    }
  },
  {
    id: "world-history-french-revolution",
    title: "World History - The French Revolution Overview.docx",
    short: "Three Estates, Fall of the Bastille, Reign of Terror, and Rise of Napoleon.",
    content: `The French Revolution (1789–1799) was a watershed period of radical social and political upheaval in France that profoundly altered the course of modern history.`,
    guide: {
      summary: "The French Revolution of 1789 represents a cornerstone of modern global political history, marking the transition from an absolute monarchy to popular sovereignty. Fueled by national bank insolvency and severe food shortages, the lower classes rebelled against centuries of feudal oppression. The revolution dismantled the archaic rigid 'estate system' that favored the clergy and nobility at the expense of the working class. This guide breaks down the structural causes, chronological flashpoints—from the storming of the Bastille to Robespierre's severe Reign of Terror—and concludes with the rise of Napoleon Bonaparte, which permanently codified key civil rights throughout Europe.",
      sections: [
        {
          title: "The Unequal Three Estates Hierarchy",
          content: "• First Estate: Consisted of Catholic clergy; held approximately 10% of French land and enjoyed complete exemptions from direct national taxation.\n• Second Estate: Consisted of top nobility; possessed vast feudal rights, monopolies, and complete direct tax immunity.\n• Third Estate: Composed of the entire remaining 98% of the populace (peasants, urban laborers, and the wealthy educated Bourgeoisie); paid 100% of the national tax burden with zero political leverage.",
          relevance: "Unmasks the severe economic inequality that rendered a radical, violent systemic collapse inevitable."
        },
        {
          title: "Milestones of Insurrection (1789–1799)",
          content: "• Estates-General Deadlock (May 1789): The Third Estate broke away due to structural voting biases, declaring themselves the sovereign National Assembly.\n• Storming of the Bastille (July 14, 1789): Revolutionaries seized the royal prison fortress, capturing gunpowder and establishing popular armed support.\n• Reign of Terror (1793–1794): Dictatorial rule under Maximilien Robespierre executing over 40,000 citizens deemed 'enemies of the revolution'.\n• Napoleonic Ascent (1799): Napoleon Bonaparte seized total control via a direct military coup d'état, ending the unstable Directory regime.",
          relevance: "Chronicles the rapid descent from moderate constitutional goals into chaotic national terror."
        }
      ],
      keyConcepts: [
        {
          concept: "Popular Sovereignty & Liberty",
          explanation: "The core ideological driving force of the revolution, moving civil power away from royal 'divine right' and anchoring it in the collective will of the citizens, as declared in the 1789 Rights of Man.",
          importance: "Dismantled absolute monarchic paradigms globally, paving the way for modern democratic constitutions."
        },
        {
          concept: "The Reign of Terror's Paradox",
          explanation: "In order to secure newly achieved democratic liberties, Maximilien Robespierre asserted that terror was a vital, moral extension of virtue. This paradox led to the systematic suspension of civil trial protections and wide-ranging executions.",
          importance: "Serves as a historical warning of how easily noble ideals can succumb to totalitarian paranoia."
        }
      ],
      vocabulary: [
        { term: "Bourgeoisie", definition: "The educated, wealthy, upper-middle-class sector of the Third Estate (lawyers, merchants) who organized the political rebellion." },
        { term: "Estates-General", definition: "The rarely summoned feudal legislative assembly of France divided into three distinct status orders." },
        { term: "Guillotine", definition: "A machine designed for quick, egalitarian executions that became the symbol of the radical revolutionary era." },
        { term: "National Assembly", definition: "The revolutionary assembly formed by representatives of the Third Estate in June 1789." }
      ],
      flashcards: [
        { front: "What group represented 98% of the French population in 1789?", back: "The Third Estate (comprising peasants, merchants, and the Bourgeoisie)." },
        { front: "On what date was the royal Bastille fortress stormed?", back: "On July 14, 1789, marking a crucial tipping point for the armed revolution." },
        { front: "Who spearheaded the radical Reign of Terror?", back: "Maximilien Robespierre alongside the Committee of Public Safety." },
        { front: "What event officially ended the revolutionary decade in 1799?", back: "Napoleon Bonaparte's military coup d'état of 18 Brumaire." }
      ]
    },
    assessments: {
      basic: [
        {
          id: "hist-b1",
          type: "mcq",
          question: "Which estate bore the complete French tax burden despite possessing virtually no political influence?",
          options: ["First Estate", "Second Estate", "Third Estate", "Royal Household"],
          correctAnswer: "Third Estate",
          explanation: "The Third Estate, making up 98% of the citizens, was forced to pay all national taxes while clergy and nobles were tax-exempt."
        },
        {
          id: "hist-b2",
          type: "tf",
          question: "Napoleon Bonaparte launched a coup d'état in 1799 to restore absolute Bourbon monarchy.",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Napoleon established the Consulate regime, keeping many revolutionary legal principles rather than restoring absolute monarchy."
        }
      ],
      medium: [
        {
          id: "hist-m1",
          type: "fib",
          question: "Maximilien Robespierre led the Committee of __, executing thousands of citizens globally.",
          correctAnswer: "Public Safety",
          explanation: "The Committee of Public Safety was the primary governing body during the peak of the Reign of Terror."
        },
        {
          id: "hist-m2",
          type: "short",
          question: "Summarize the primary purpose of writing the Declaration of the Rights of Man in August 1789.",
          correctAnswer: "To establish standard human rights, democratic citizenship, and civil equality across the new French state.",
          explanation: "It served as a constitutional blueprint asserting equality, liberty, and sovereignty of the nation over the king."
        }
      ],
      hard: [
        {
          id: "hist-h1",
          type: "essay",
          question: "Critically examine how the combination of sudden financial bankruptcy and absolute systemic class division catalyzed the outbreak of the French Revolution in 1789.",
          sampleAnswer: "France's excessive expenditures on royal lifestyles and backing the American Revolution triggered absolute bankruptcy. King Louis XVI's attempt to raise capital required convening the Estates-General. Since voting was conducted by Estate status rather than individual heads, the tax-exempt First and Second Estates easily outvoted the burdened Third Estate. Resolving this voting deadlock forced the Third Estate to rebel, declare the National Assembly, and challenge absolute monarchal rule directly.",
          gradingCriteria: "• Traces fiscal crisis to royal spending and the American Revolution.\n• Outlines the structural flaw of voting in the Estates-General.\n• Links class inequality to the declaration of the National Assembly.",
          explanation: "Class division blocked diplomatic solutions to bankruptcy, leaving armed popular revolution as the only avenue of systemic reform."
        }
      ]
    }
  },
  {
    id: "intro-ai-neural-networks",
    title: "Introduction to Artificial Intelligence & Neural Networks.pptx",
    short: "Supervised vs Unsupervised learning, Neurons, Weights, Activation functions.",
    content: `Artificial Intelligence (AI) refers to the simulation of human intelligence processes by computer systems, focusing on learning, reasoning, and self-correction.`,
    guide: {
      summary: "Modern Artificial Intelligence represents a paradigm shift from rigid rule-based programming to adaptive machine learning systems. Rather than receiving explicit lines of code instructions, modern algorithms dynamically ingest large datasets, modeling complex statistical dependencies to recognize concepts. This guide demystifies the major pathways of learning (Supervised, Unsupervised, and Reinforcement) and explores Artificial Neural Networks (ANN). These networks mimic biological brains through layers of inputs, computational weights, biases, and non-linear activation functions that mathematically map complex patterns.",
      sections: [
        {
          title: "Major Paradigms of Machine Learning",
          content: "• Supervised Learning: Models are trained on fully labeled datasets to predict targets (e.g., classification of tumors, housing cost regression).\n• Unsupervised Learning: Systems analyze unlabeled data structures to discover hidden associations or clusters (e.g., consumer segmentation analysis, PCA).\n• Reinforcement Learning: Virtual agents learn optimal behaviors inside simulated environments by receiving dynamic rewards or penalties (e.g., chess engines).",
          relevance: "Defines the specific mathematical objective and model setup needed for clean deployment."
        },
        {
          title: "Artificial Neural Networks (ANN) Anatomy",
          content: "• Input Layer: Takes passive features (like pixel arrays) and feeds them representing coordinates.\n• Weights & Biases: Dynamic numerical dials that adaptively scale and shift raw signals to minimize prediction errors.\n• Activation Functions: Inject non-linear properties. ReLU is the standard (f(x) = max(0, x)) to prevent vanishing gradients, while Sigmoid scales vectors to a clean 0-to-1 probability range.\n• Backpropagation & Loss: Calculates total prediction error and transfers it backward to adjust weights using gradient descent.",
          relevance: "Unlocks the fundamental mathematical processes operating beneath modern deep learning algorithms."
        }
      ],
      keyConcepts: [
        {
          concept: "Non-Linear Activation Mapping",
          explanation: "Without active non-linear activation functions, a multi-layered neural network collapses mathematically into one standard linear regression equation, unable to parse complex patterns like images, speech, or language.",
          importance: "Enables neural networks to approximate complex mathematical functions of high dimensions."
        },
        {
          concept: "Backpropagation via Gradient Descent",
          explanation: "Backpropagation uses the calculus chain rule to calculate how much each individual weight contributed to the network's final prediction error. Gradient descent then slightly nudges those weights in the direction that lowers overall loss.",
          importance: "It is the fundamental learning engine enabling deep multi-layer neural networks to train on massive datasets."
        }
      ],
      vocabulary: [
        { term: "Activation Function", definition: "A mathematical operator that determines whether a node should activate, transforming linear weights into non-linear signals." },
        { term: "Backpropagation", definition: "An algorithm that passes prediction errors backward through layers to calculate gradients for weight adjustment." },
        { term: "ReLU", definition: "Rectified Linear Unit; standard activation function returning 0 if input is negative, and the raw input if positive." },
        { term: "Supervised Learning", definition: "A methodology of machine learning where models train on fully mapped inputs paired with explicit output labels." }
      ],
      flashcards: [
        { front: "What type of machine learning uses fully labeled inputs?", back: "Supervised Learning (highly standard for regression and classification)." },
        { front: "What is the primary formula of the ReLU activation function?", back: "f(x) = max(0, x) - it maps all negative inputs to zero." },
        { front: "Which process calculates the gradients of the network loss function?", back: "Backpropagation, which leverages the calculus chain rule backward." },
        { front: "What role do weights and biases play in neural connections?", back: "They act as tunable mathematical parameters adjusted during training to map patterns." }
      ]
    },
    assessments: {
      basic: [
        {
          id: "ai-b1",
          type: "mcq",
          question: "Which activation function is widely preferred in deep hidden layers to prevent vanishing gradient problems by returning f(x) = max(0, x)?",
          options: ["Sigmoid", "Tangent", "ReLU (Rectified Linear Unit)", "Binary Step"],
          correctAnswer: "ReLU (Rectified Linear Unit)",
          explanation: "ReLU is highly efficient because its positive slope remains constant, preventing gradient decay during training."
        },
        {
          id: "ai-b2",
          type: "tf",
          question: "Unsupervised learning requires fully labeled training datasets to categorize inputs.",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Unsupervised learning discovers hidden patterns in unlabeled dataset matrices without explicit targets."
        }
      ],
      medium: [
        {
          id: "ai-m1",
          type: "fib",
          question: "Adjusting synaptic parameters backward in order to reduce prediction errors is based on the __ algorithm.",
          correctAnswer: "Backpropagation",
          explanation: "Backpropagation calculates errors layer-by-layer backwards using the calculus chain rule."
        },
        {
          id: "ai-m2",
          type: "short",
          question: "What would occur if a neural net has zero non-linear activation functions?",
          correctAnswer: "The network would function simply as a single linear model, making it unable to learn complex non-linear patterns.",
          explanation: "Linear combinations of linear transformations always yield of a single simple linear transformation, limiting network depth."
        }
      ],
      hard: [
        {
          id: "ai-h1",
          type: "essay",
          question: "Elaborate on the mathematical connection between the Loss Function, Backpropagation, and Gradient Descent in model refinement.",
          sampleAnswer: "The Loss Function calculates the literal error between network predictions and true labels. Backpropagation leverages the calculus chain rule to compute the partial derivative of this loss with respect to each tunable weight in the network. Gradient Descent uses these gradients as a guide, subtracting a fraction of the gradient (scaled by the learning rate) from each weight. This iterative loop progressively refines the weights to minimize prediction error.",
          gradingCriteria: "• Defines the loss function as the error metric.\n• Explains backpropagation as calculating partial derivatives of loss via the chain rule.\n• Identifies gradient descent as adjusting weights to minimize loss.",
          explanation: "Loss quantifies inaccuracy, backpropagation identifies specific weight contributions, and gradient descent systematically repairs them."
        }
      ]
    }
  },
  {
    id: "organic-chemistry-carbon",
    title: "Organic Chemistry - Carbon Compounds & Reactions.txt",
    short: "Functional groups, nucleophilic substitution, resonance, and electronegativity.",
    content: "Organic chemistry is the scientific study of the structure, properties, composition, reactions, and preparation of carbon-containing organic compounds.",
    guide: {
      summary: "Organic chemistry is centered on the structural properties and versatile reactions of carbon-based molecules. Known as the element of life, carbon's ability to form stable covalent bonds with other carbon atoms in long chains and rings (catenation) creates vast molecular diversity. This study guide covers primary functional groups, resonance structures, nucleophilic substitution mechanisms (SN1 and SN2), and explains how electronegativity and steric hindrance dictate molecular reactivity.",
      sections: [
        {
          title: "Carbon's Hybridization & Functional Groups",
          content: "• Hybridization: Carbon can hybridize into sp3 (tetrahedral, single bonds), sp2 (trigonal planar, double bonds), or sp (linear, triple bonds) geometries.\n• Key Functional Groups: Hydroxyl (-OH, alcohols), Carbonyl (C=O, ketones/aldehydes), Carboxyl (-COOH, carboxylic acids), and Amino (-NH2, amines).\n• Resonance: The delocalization of pi electrons in a conjugate system, providing stabilizing effects (e.g., Benzene).",
          relevance: "Understanding functional groups and hybridization is key to predicting reaction pathways and bond angles."
        },
        {
          title: "Substitution Reactions: SN1 vs SN2 Mechanisms",
          content: "• SN1 (Substitution Nucleophilic Unimolecular): A two-step mechanism. The leaving group departs first to form a stable carbocation intermediate, which is then attacked by a nucleophile. Highly favored in tertiary carbons.\n• SN2 (Substitution Nucleophilic Bimolecular): A concerted one-step mechanism. The nucleophile performs a backside attack simultaneously as the leaving group departs, leading to steric inversion. Highly favored in primary carbons.",
          relevance: "Determines how solvent choice, leaving groups, and steric factors influence competitive reaction pathways."
        }
      ],
      keyConcepts: [
        {
          concept: "Electronegativity and Bond Polarization",
          explanation: "Electronegativity is an atom's affinity to attract bonding electrons. In functional groups like carbonyls (C=O), oxygen's higher electronegativity pulls electron density away from carbon, giving carbon a partial positive charge (electrophile) and making it highly vulnerable to nucleophilic attack.",
          importance: "It explains the fundamental polarization that drives organic reaction mechanisms."
        },
        {
          concept: "Steric Hindrance",
          explanation: "Steric hindrance is the physical crowding of atoms around a reaction center. Large, bulky groups physically block approaching nucleophiles, explaining why SN2 reactions are slow on tertiary carbons while SN1 proceeds easily through a flat, accessible carbocation intermediate.",
          importance: "Explains structural constraints that dictate reaction kinetics and product distributions."
        }
      ],
      vocabulary: [
        { term: "Carbocation", definition: "A highly reactive, positively charged carbon intermediate formed in SN1 reactions." },
        { term: "Nucleophile", definition: "An electron-rich species (such as water or hydroxide) that donates electron pairs to form chemical bonds." },
        { term: "Leaving Group", definition: "An atom or molecular fragment that leaves with a pair of electrons during a substitution or elimination reaction." },
        { term: "Resonance", definition: "An electron distribution model representing a system with multiple valid Lewis structures." }
      ],
      flashcards: [
        { front: "What is the molecular geometry of an sp3 hybridized carbon?", back: "Tetrahedral, with ideal bond angles of approximately 109.5 degrees." },
        { front: "Which mechanism involves a carbocation intermediate: SN1 or SN2?", back: "SN1 (Substitution Nucleophilic Unimolecular)." },
        { front: "Which nucleophilic mechanism leads to complete configuration inversion?", back: "SN2, due to its coordinated backside attack." },
        { front: "What functional group is represented by the formula -COOH?", back: "Carboxylic Acid, characterized by high acidity." }
      ]
    },
    assessments: {
      basic: [
        {
          id: "chem-b1",
          type: "mcq",
          question: "Which substitution mechanism proceeds via a flat carbocation intermediate in a two-step sequence?",
          options: ["SN1 Mechanism", "SN2 Mechanism", "E2 Elimination", "Free-Radical Halogenation"],
          correctAnswer: "SN1 Mechanism",
          explanation: "SN1 reactions involve carbocation formation as the rate-limiting first step."
        },
        {
          id: "chem-b2",
          type: "tf",
          question: "SN2 reactions are highly favored by bulky, sterically hindered tertiary carbons.",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "SN2 requires an active backdoor assault, which steric crowding on tertiary carbons blocks."
        }
      ],
      medium: [
        {
          id: "chem-m1",
          type: "fib",
          question: "The chemical stabilization effect provided by the delocalization of pi electrons is called __.",
          correctAnswer: "Resonance",
          explanation: "Resonance disperses electron density across atoms, lowering overall potential energy."
        },
        {
          id: "chem-m2",
          type: "short",
          question: "Explain why an iodine ion (I-) is a much stronger leaving group than a fluorine ion (F-).",
          correctAnswer: "Iodine is larger and less basic, allowing it to stabilize negative charges more effectively.",
          explanation: "Due to its larger atomic size, the iodine ion stabilizes negative charges across a broad surface area, making it a weak base and excellent leaving group."
        }
      ],
      hard: [
        {
          id: "chem-h1",
          type: "scenario",
          question: "A chemist wants to synthesize 2-butanol from 2-bromobutane. Analyze the stereochemical outcome under polar protic solvents (H2O) versus polar aprotic solvents (DMSO).",
          sampleAnswer: "In a polar protic solvent like water, the SN1 pathway is stabilized. The leaving group departs to form a flat carbocation. Nucleophilic water can attack from either side, resulting in a racemic mixture of both enantiomers of 2-butanol. In a polar aprotic solvent like DMSO, the nucleophile is not heavily solvated, promoting an SN2 backside attack. This concerted process results in complete inversion of stereochemistry, producing a single pure enantiomeric product.",
          gradingCriteria: "• Connects polar protic solvents (H2O) to carbocation stabilization and SN1 racemization.\n• Connects polar aprotic solvents (DMSO) to a concerted SN2 pathway.\n• Identifies the stereochemical inversion outcome of the SN2 pathway.",
          explanation: "Solvents alter mechanism dynamics: protic stabilized ions favor SN1 racemization, whereas aprotic speeds up SN2 stereocenter inversion."
        }
      ]
    }
  },
  {
    id: "macroeconomics-inflation-gdp",
    title: "Macroeconomics - Inflation, GDP & Monetary Policy.xlsx",
    short: "GDP calculations, aggregate demand, inflation indexes, and central banking metrics.",
    content: "Macroeconomics covers national and global resource utilization, price stability, domestic productivity, and central banking policy frameworks.",
    guide: {
      summary: "Macroeconomics analyzes the aggregates of economic systems, focusing on national productivity, employment, price stability, and economic growth loops. Key metrics like Gross Domestic Product (GDP) measure the market value of all final goods and services produced within a country's borders. This guide explores the details of GDP calculation, the mechanics and impacts of inflation (measured by CPI and PPI), and how central banks utilize monetary policy to manage economic cycles, stabilize inflation, and prevent severe recessions.",
      sections: [
        {
          title: "Tracking National Productivity (GDP)",
          content: "• Expenditures Approach: GDP = C + I + G + (X - M) where C is private consumption, I is gross investment, G is government spending, and (X - M) is net exports.\n• Nominal vs Real GDP: Nominal GDP measures raw output using current market prices, whereas Real GDP adjusts for price fluctuations using a base year deflator to isolate actual productive growth.\n• Limits of GDP: Excludes external factors (environmental damage), volunteer work, and under-the-table transactions.",
          relevance: "Unmasks the primary equation used to grade national economic performance."
        },
        {
          title: "Monetary Policy & Inflation Controls",
          content: "• Inflation Drivers: Demand-Pull Inflation (excessive aggregate demand outstripping productive capacity) and Cost-Push Inflation (surging supply costs, like energy crises).\n• Central Bank Operations: Controlling the money supply and setting benchmark interest rates.\n• Expansionary vs Contractionary Policies: In high inflation, central banks enact contractionary policies—raising interest rates—to slow spending. During recessions, they lower rates to stimulate borrowing and investment.",
          relevance: "Explains how interest rate adjustments impact borrowing costs, asset markets, and employment."
        }
      ],
      keyConcepts: [
        {
          concept: "The Paradox of Thrift",
          explanation: "If every household attempts to increase savings during a recession, aggregate consumption demand collapses, causing businesses to lay off workers. This reduction in national income ultimately reduces total overall savings.",
          importance: "It serves as the foundation for Keynesian interventions during deep recessions."
        },
        {
          concept: "Monetary Policy Transmission",
          explanation: "When a central bank changes benchmark interest rates, it triggers a chain reaction: commercial bank prime rates shift, altering mortgage and business loan borrowing costs. This adjustments directly impact household spending and business expansion, shifting aggregate demand.",
          importance: "Explains why interest rates are highly potent macro-control dials."
        }
      ],
      vocabulary: [
        { term: "Federal Funds Rate", definition: "The target interest rate at which commercial banks borrow and lend reserve funds to each other overnight." },
        { term: "GDP Deflator", definition: "A broad price index representing price level changes in all domestic goods and services, used to calculate Real GDP." },
        { term: "Stagflation", definition: "An economic anomaly featuring high inflation alongside stagnating growth and elevated unemployment." },
        { term: "Consumer Price Index (CPI)", definition: "A metric monitoring structural average price shifts over time for a representative basket of household goods and services." }
      ],
      flashcards: [
        { front: "What is the formula representing the expenditure approach to GDP?", back: "GDP = C + I + G + (X - M) (Consumption, Investment, Government, Net Exports)." },
        { front: "How does Real GDP differ from Nominal GDP?", back: "Real GDP adjusts output for inflation using a base-year deflator to isolate true volume growth." },
        { front: "What is demand-pull inflation?", back: "Inflation triggered when rising aggregate demand outstrips the economy's productive capacity." },
        { front: "What interest rate action does a central bank take to combat high inflation?", back: "It raises benchmark interest rates to lower demand pressures." }
      ]
    },
    assessments: {
      basic: [
        {
          id: "econ-b1",
          type: "mcq",
          question: "Which component of the expenditure GDP equation is subtracted because it represents spending on foreign products?",
          options: ["Government Purchases (G)", "Gross Investment (I)", "Imports (M)", "Exports (X)"],
          correctAnswer: "Imports (M)",
          explanation: "Imports represent expenditures on foreign production, and must be subtracted to calculate Gross Domestic Product."
        },
        {
          id: "econ-b2",
          type: "tf",
          question: "Central banks typically lower interest rates to curb high inflation during inflationary bubbles.",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Banks raise interest rates to cool the economy and curb inflation, and lower them to stimulate growth during recessions."
        }
      ],
      medium: [
        {
          id: "econ-m1",
          type: "fib",
          question: "The economic state characterized by stagnant growth, high inflation, and high unemployment is called __.",
          correctAnswer: "Stagflation",
          explanation: "Stagflation occurs when supply shocks raise energy/production costs while simultaneously dampening absolute output."
        },
        {
          id: "econ-m2",
          type: "short",
          question: "Briefly explain the structural difference between CPI (Consumer Price Index) and the GDP Deflator.",
          correctAnswer: "CPI monitors a fixed basket of consumer goods, while the GDP Deflator reflects changes in all domestically produced goods and services.",
          explanation: "CPI captures consumer cost-of-living impacts (including imported goods), while the GDP Deflator models broad domestic production inflation."
        }
      ],
      hard: [
        {
          id: "econ-h1",
          type: "scenario",
          question: "Suppose an economy faces severe stagnation with 8% inflation and 9% unemployment. Outline the central bank's policy dilemma in choosing between supportive expansionary and combatant contractionary actions.",
          sampleAnswer: "The central bank faces stagflation. Under this condition, traditional monetary policies conflict. If they deploy expansionary monetary policy (lowering interest rates), they stimulate borrowing and job growth to address the 9% unemployment, but risk worsening the 8% inflation. If they use contractionary policies (raising rates), they cool spending to combat inflation, but risk raising unemployment. This forces policymakers to navigate complex trade-offs, often relying on targeted supply-side structural initiatives.",
          gradingCriteria: "• Explains the central bank dilemma of choosing between inflation and unemployment.\n• Identifies that expansionary policies risk feeding inflation.\n• Identifies that contractionary policies risk increasing unemployment.",
          explanation: "Stagflation breaks standard interest rate feedback loops, as policies targeting inflation aggravate unemployment, and vice versa."
        }
      ]
    }
  },
  {
    id: "environmental-science-climate",
    title: "Environmental Science - Climate Change & Carbon Cycles.txt",
    short: "Greenhouse effect, carbon reservoirs, feedback loops, and ocean acidification.",
    content: "Environmental science studies ecological dynamics, human footprint factors, organic carbon transformations, and planetary heat exchange balances.",
    guide: {
      summary: "Environmental science examines the delicate biological, chemical, and physical interactions that govern Earth's climate systems. A central focus is the carbon cycle, which regulates planetary temperatures via greenhouse gas concentrations in the atmosphere. This study guide explores the details of greenhouse gas heat absorption, identifies major carbon reservoirs, and examines the impacts of human-driven changes, including warming feedback loops and ocean acidification.",
      sections: [
        {
          title: "The Greenhouse Effect & Carbon Reservoirs",
          content: "• Heat Mechanics: Shortwave solar radiation passes through the atmosphere to heat Earth's surface. The surface radiates this energy back as longwave infrared waves, which are captured by trace greenhouse gases (CO2, CH4, H2O), trapping heat in the system.\n• Carbon Reservoirs: Carbon is stored in the Atmosphere (active gas), Biosphere (living biomass/soil), Oceans (dissolved inorganic carbon), and Lithosphere (carbonate rocks, ancient fossil fuels).",
          relevance: "Explains how shifts in greenhouse gas concentrations alter global temperatures."
        },
        {
          title: "Planetary Feedback Loops & Ocean Impacts",
          content: "• Albedo Feedback Loop: As global temperatures rise, reflective glaciers melt, exposing darker water surfaces that absorb more solar radiation, accelerating warming.\n• Permafrost Feedback Loop: Warming melts Arctic permafrost, unleashing buried organic matter. Decomposers digest this matter, releasing massive amounts of CO2 and methane.\n• Ocean Acidification: The oceans absorb roughly 30% of anthropogenic CO2 emissions. This CO2 reacts with seawater to form carbonic acid, lowering ocean pH levels.",
          relevance: "Shows how initial human impacts can trigger natural acceleration loops."
        }
      ],
      keyConcepts: [
        {
          concept: "Ocean Acidification Chemistry",
          explanation: "Dissolved carbon dioxide combines with seawater to produce carbonic acid (H2CO3), which dissociates to release free hydrogen ions, lowering pH. These hydrogen ions bind to carbonate ions to form bicarbonate, depleting the carbonate ions marine organisms need to build calcium carbonate shells.",
          importance: "It explains the widespread threat of rising emissions to coral reefs and marine food webs."
        },
        {
          concept: "Albedo Effect Feedback",
          explanation: "Albedo represents a surface's reflectivity. Pure snow reflects up to 90% of solar radiation back into space. As warming melts this snow, it exposes low-albedo ocean water (which absorbs 90% of light), converting a high-reflection surface into an active solar heat absorber.",
          importance: "Demonstrates how natural feedback loops can accelerate global warming trends."
        }
      ],
      vocabulary: [
        { term: "Albedo", definition: "A measure of the reflectivity of a surface, ranging from 0 (total absorption) to 1 (total reflection)." },
        { term: "Carbon Sink", definition: "A natural reservoir (such as forests or oceans) that absorbs and stores more carbon from the atmosphere than it releases." },
        { term: "Ocean Acidification", definition: "The reduction in ocean pH levels caused by the absorption of atmospheric carbon dioxide." },
        { term: "Permafrost", definition: "Ground that remains completely frozen (0°C or colder) for two or more consecutive years." }
      ],
      flashcards: [
        { front: "What type of solar radiation is trapped by greenhouse gases?", back: "Longwave infrared radiation emitted from Earth's warmed surface." },
        { front: "Which carbon reservoir holds the largest share of Earth's carbon?", back: "The Lithosphere (stored within sedimentary carbonate rocks and deep crust elements)." },
        { front: "How does ocean carbon absorption affect pH levels?", back: "CO2 absorption produces carbonic acid, releasing H+ ions and lowering pH." },
        { front: "What warming feedback loop is triggered by melting polar ice?", back: "The Albedo feedback loop, which exposes darker, heat-absorbing ocean water." }
      ]
    },
    assessments: {
      basic: [
        {
          id: "env-b1",
          type: "mcq",
          question: "Which of the following is a key greenhouse gas that absorbs longwave infrared radiation emitted by Earth's surface?",
          options: ["Nitrogen (N2)", "Oxygen (O2)", "Carbon Dioxide (CO2)", "Argon (Ar)"],
          correctAnswer: "Carbon Dioxide (CO2)",
          explanation: "Carbon dioxide possesses molecular bonds that absorb infrared rays, trapping heat in the atmosphere."
        },
        {
          id: "env-b2",
          type: "tf",
          question: "Melting polar ice caps increase Earth's structural albedo, reflecting more solar heat into space.",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "Melting ice exposes darker ocean water, which absorbs more solar radiation and accelerates warming."
        }
      ],
      medium: [
        {
          id: "env-m1",
          type: "fib",
          question: "The chemical process where dissolved carbon dioxide lowers seawater pH is called ocean __.",
          correctAnswer: "acidification",
          explanation: "Ocean acidification occurs as CO2 absorption increases carbonic acid and free hydrogen ions."
        },
        {
          id: "env-m2",
          type: "short",
          question: "Briefly explain the permafrost warming feedback loop.",
          correctAnswer: "Warming melts frozen tundra soil, releasing stored organic carbon that microbes decompose into carbon dioxide and methane, accelerating warming.",
          explanation: "Permafrost melt exposes ancient biomass to rapid decay, converting carbon sinks into carbon sources."
        }
      ],
      hard: [
        {
          id: "env-h1",
          type: "scenario",
          question: "Analyze the chemical impact of ocean acidification on calcifying organisms like corals and shellfish, detailing how pH shifts alter shell production.",
          sampleAnswer: "Ocean absorption of CO2 produces carbonic acid (H2CO3), which releases free hydrogen ions (H+) that lower pH. These excess H+ ions compete with calcifying organisms for carbonate ions (CO3^2-), binding with them to form bicarbonate (HCO3^-). This depletes the concentration of carbonate ions needed to build shells and skeletons, leaving corals and shellfish unable to maintain their structures and threatening marine ecosystems.",
          gradingCriteria: "• Outlines CO2 absorption forming carbonic acid and releasing H+ ions.\n• Identifies the depletion of carbonate ions via bicarbonate formation.\n• Links the loss of carbonate ions to impaired calcium carbonate shell production.",
          explanation: "Acidification consumes carbonate ions, starving marine calcifiers of the building blocks needed to grow stable shells."
        }
      ]
    }
  },
  {
    id: "literature-shakespeares-hamlet",
    title: "Literature - Shakespeare's Hamlet Depth Analysis.txt",
    short: "Existential motifs, tragic hamartia, solilioquy parsing, and dramatic foil dynamics.",
    content: "Shakespeare's Hamlet examines the psychological complexity of revenge, tragic hesitation, corruption, and existential dread in Denmark.",
    guide: {
      summary: "William Shakespeare's 'Hamlet' stands as an artistic masterpiece of English drama, exploring themes of familial betrayals, existential dread, and ethical paralysis. Written during the transition from the Elizabethan to Jacobean eras, the tragedy breaks from standard revenge dramas by focusing on its protagonist's inner conflict. This guide examines Hamlet's tragic hesitation, analyzes key soliloquies, and explores how supporting characters serve as dramatic foils to contrast Hamlet's worldview.",
      sections: [
        {
          title: "Existential Paralysis & Tragic Hesitation",
          content: "• Existential Hesitation: Rather than acting swiftly to avenge his father, Hamlet encounters severe moral paralysis, questioning the value of existence, life, and the consequences of death.\n• Hamartia (Tragic Flaw): Hamlet's fatal flaw is his tendency to overanalyze situations, which blocks swift action and leads to widespread tragedy.\n• Poison Motif: Rot and decay in Denmark are represented by literal and figurative poison—from the poison poured into King Hamlet's ear to the poisoned chalice in the final duel.",
          relevance: "Highlights the shifts in Renaissance thinking toward complex psychological complexity and individualism."
        },
        {
          title: "Dramatic Foil Dynamics & Character Structures",
          content: "• Laertes: A direct catalyst foil. Upon learning of his father Polonius's murder, Laertes acts immediately with hot-blooded passion, highlighting Hamlet's slow, analytical hesitation.\n• Fortinbras: A political foil. Prince Fortinbras of Norway marches to claim disputed territories with decisiveness, demonstrating true royal assertiveness.\n• Ophelia: Represents fragile innocence caught in court politics, destroyed by the deception and madness around her.",
          relevance: "Demonstrates how dramatic foils highlight a protagonist's core themes through contrast."
        }
      ],
      keyConcepts: [
        {
          concept: "Existentialism in the 'To Be or Not to Be' Soliloquy",
          explanation: "In Act 3, Scene 1, Hamlet compares life to a painful burden ('the slings and arrows of outrageous fortune') endured only due to fear of the unknown after death. This soliloquy shifts his dilemma from personal revenge to a broader exploration of the human condition.",
          importance: "It serves as the focal point of existential thought in early modern theater."
        },
        {
          concept: "The Illusion of Madness",
          explanation: "Hamlet adopts an 'antic disposition' (feigned madness) to safely investigate the court and lower King Claudius's guard. Over time, the line between his calculated performance and actual psychological decay blurs, complicating his relationships.",
          importance: "Balances character reliability, creating layers of dramatic irony."
        }
      ],
      vocabulary: [
        { term: "Hamartia", definition: "A tragic flaw or misjudgment that leads to the downfall of a dramatic hero." },
        { term: "Soliloquy", definition: "A dramatic speech where a character speaks their thoughts aloud alone on stage, revealing inner motives." },
        { term: "Foils", definition: "Characters who contrast sharply with the protagonist to highlight specific elements of their personality." },
        { term: "Antic Disposition", definition: "The mask of madness assumed by Hamlet as a strategic cover in the Danish court." }
      ],
      flashcards: [
        { front: "What is Hamlet's primary tragic flaw (Hamartia)?", back: "Procrastination and over-contemplation, preventing active execution of revenge." },
        { front: "Which Prince of Norway serves as a political foil to Hamlet?", back: "Prince Fortinbras, who acts with decisive military action." },
        { front: "Where does King Claudius pour the poison to murder King Hamlet?", back: "Directly into Prince Hamlet's father's ear during his sleep." },
        { front: "What does Hamlet's famous 'To be or not to be' soliloquy examine?", back: "The choice between enduring life's pain and the fear-fueled escape of death." }
      ]
    },
    assessments: {
      basic: [
        {
          id: "lit-b1",
          type: "mcq",
          question: "Which character serves as an active, impulsive foil to Hamlet, seeking instant revenge for his father Polonius?",
          options: ["Horatio", "Guildenstern", "Laertes", "Fortinbras"],
          correctAnswer: "Laertes",
          explanation: "Laertes returns with a political faction to avenge his father, contrasting with Hamlet's deliberate hesitation."
        },
        {
          id: "lit-b2",
          type: "tf",
          question: "Prince Fortinbras is a dramatic foil who seeks to conquer lands with decisive military campaigns.",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Fortinbras's military decisiveness contrasts with Hamlet's intellectual paralysis."
        }
      ],
      medium: [
        {
          id: "lit-m1",
          type: "fib",
          question: "The strategically assumed mask of insanity worn by Hamlet is referred to as his antic __.",
          correctAnswer: "disposition",
          explanation: "Hamlet adopts an antic disposition to obscure his actions and evaluate the court's loyalties."
        },
        {
          id: "lit-m2",
          type: "short",
          question: "Explain the central theme of Hamlet's 'To be or not to be' soliloquy.",
          correctAnswer: "It examines the conflict between enduring life's sufferings and escaping them through death, which is blocked by fear of the afterlife.",
          explanation: "It shifts his focus from standard revenge to an existential questioning of life, action, and mortality."
        }
      ],
      hard: [
        {
          id: "lit-h1",
          type: "essay",
          question: "Evaluate how William Shakespeare utilizes the dramatic foils of Laertes and Fortinbras to highlight Hamlet's psychological conflicts.",
          sampleAnswer: "Laertes and Fortinbras face similar losses to Hamlet: murdered fathers and stolen kingdoms. However, the three characters react in contrasting ways. Fortinbras acts with decisive military actions to reclaim disputed lands. Laertes takes impulsive, violent action to storm the castle and avenge his father. In contrast, Hamlet retreats into analytical over-contemplation and moral paralysis. By placing these foils alongside the protagonist, Shakespeare highlights Hamlet's tragic hesitation, elevating his paralysis from simple procrastination to a complex existential study.",
          gradingCriteria: "• Identifies Laertes and Fortinbras's shared losses with Hamlet.\n• Contrasts Fortinbras's military action and Laertes's impulsive revenge with Hamlet's hesitation.\n• Analyzes how these contrasts highlight Hamlet's tragic paralysis.",
          explanation: "Foils externalize Hamlet's inner struggles: their immediate actions model what Hamlet should do, highlighting his paralysis."
        }
      ]
    }
  }
];
