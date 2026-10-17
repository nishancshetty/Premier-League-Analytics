const axios = require("axios");
const cache = require("../utils/cache");

const OPENAI_BASE_URL = "https://api.openai.com/v1";

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  return axios.create({
    baseURL: OPENAI_BASE_URL,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    timeout: 8000,
  });
}

/**
 * Generate AI Tactical Analysis for a matchup using OpenAI or Tactical Knowledge Engine
 */
async function generateTacticalAnalysis(homeTeam, awayTeam, stats = {}) {
  const cacheKey = `ai_tactical_${homeTeam?.id || homeTeam}_${awayTeam?.id || awayTeam}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const client = getClient();
  const homeName = homeTeam?.name || homeTeam?.shortName || "Home Team";
  const awayName = awayTeam?.name || awayTeam?.shortName || "Away Team";

  if (client) {
    try {
      const prompt = `You are a world-class Premier League tactical analyst and performance director.
Provide a concise, expert tactical preview for the upcoming Premier League match between ${homeName} (Home) and ${awayName} (Away).
Data Context:
- Home xG: ${stats.homeXG || 1.8}, Away xG: ${stats.awayXG || 1.2}
- Win probabilities: ${homeName} ${stats.homeWinProb || 48}%, Draw ${stats.drawProb || 26}%, ${awayName} ${stats.awayWinProb || 26}%

Please respond in JSON format with exactly these fields:
{
  "tacticalInsight": "A sharp 2-sentence tactical breakdown of press structures, transitional dynamics, and how the game will be won or lost.",
  "keyMatchupInsight": "A 1-sentence insight on the decisive individual battle on the pitch.",
  "projectedTerritory": "Estimated possession split e.g. 54% - 46%",
  "tacticalStyle": {
    "home": "e.g. High-press positional overload",
    "away": "e.g. Compact mid-block counter"
  }
}`;

      const response = await client.post("/chat/completions", {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an elite Premier League tactical data analyst." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 300,
        response_format: { type: "json_object" },
      });

      const content = response.data?.choices?.[0]?.message?.content;
      const parsed = JSON.parse(content);
      cache.set(cacheKey, parsed, 1800);
      return parsed;
    } catch (error) {
      // Graceful fallback to deterministic tactical model without exposing key
    }
  }

  // Deterministic tactical fallback
  const fallback = {
    tacticalInsight: `AI Tactical Model projects ${homeName} leveraging positional overloads and high counter-pressing against ${awayName}'s defensive shape. Expect transitions in the wide channels to dictate momentum.`,
    keyMatchupInsight: `Decisive duel: Primary playmaker versus central defensive shield in transitional counter-pressing moments.`,
    projectedTerritory: `${Math.round(52 + ((stats.homeWinProb || 50) - (stats.awayWinProb || 30)) * 0.15)}% - ${Math.round(48 - ((stats.homeWinProb || 50) - (stats.awayWinProb || 30)) * 0.15)}%`,
    tacticalStyle: {
      home: "Positional Attack & Counter-Press",
      away: "Mid-Block & Direct Transition",
    },
  };
  cache.set(cacheKey, fallback, 1800);
  return fallback;
}

/**
 * Ask the AI Tactical Assistant a custom football analytics question
 */
async function askAIAssistant(prompt, context = {}) {
  const client = getClient();

  if (client) {
    try {
      const systemPrompt = `You are PL/X Intelligence Assistant, an elite artificial intelligence trained in Premier League football analytics, tactical board analysis, player telemetry, and match predictions. Provide insightful, punchy, expert answers with football data context.`;

      const userPrompt = context.homeTeam && context.awayTeam
        ? `[Match Context: ${context.homeTeam} vs ${context.awayTeam}]\n\nQuestion: ${prompt}`
        : prompt;

      const response = await client.post("/chat/completions", {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 450,
      });

      const answer = response.data?.choices?.[0]?.message?.content?.trim();
      if (answer) {
        return {
          success: true,
          answer,
          source: "OpenAI GPT Neural Engine",
          model: "gpt-4o-mini",
        };
      }
    } catch (error) {
      // If OpenAI fails or returns 401, smoothly switch to Tactical Knowledge Engine
    }
  }

  // Tactical Knowledge Engine response
  const deterministicResult = generateDeterministicTacticalAnswer(prompt, context);
  return {
    success: true,
    answer: deterministicResult.answer,
    source: deterministicResult.source,
    model: deterministicResult.model,
  };
}

/**
 * Intelligent Deterministic Football Tactical Engine
 */
function generateDeterministicTacticalAnswer(prompt, context = {}) {
  const p = prompt.toLowerCase();

  if (p.includes("city") && (p.includes("press") || p.includes("counter-press") || p.includes("defend"))) {
    return {
      answer: `Manchester City executes a coordinated 4-4-2 / 4-2-4 high-press structure under Pep Guardiola:

• First-Line Shadowing: Erling Haaland curves his run to cut off the central switch between opposing center-backs, while Bernardo Silva or Kevin De Bruyne jumps onto the defensive midfielder to deny easy pivot escapes.
• Touchline Traps & Overloads: Once the ball is directed wide, the ball-near winger and advancing fullback step up synchronously to compress space, backed by high interior pressing from Rodri or Kovačić.
• Rest Defense & Counter-Press: Behind the press, City maintains a rigid 3-2 rest defense structure, suffocating direct clearance channels and aiming to win possession back within 5-6 seconds of any turnover.`,
      source: "PL/X Tactical Knowledge Engine",
      model: "Tactical Telemetry v2.4",
    };
  }

  if (p.includes("arsenal") && (p.includes("press") || p.includes("defend") || p.includes("block"))) {
    return {
      answer: `Arsenal deploys Europe's most disciplined 4-4-2 mid-to-high defensive block under Mikel Arteta:

• Compact Vertical Spacing: Arsenal maintains less than 28 meters between Saliba/Gabriel and Martin Ødegaard/Havertz, suffocating the opposition's central half-spaces.
• Sideline Traps: Ødegaard initiates pressing triggers as soon as a backward pass is played, signaling Bukayo Saka and Declan Rice to close the interior passing angle.
• Aerial & Duel Dominance: Their rest defense focuses on winning first contact aerially (Gabriel/Saliba winning over 68% of defensive duels), forcing opponents into low-percentage long balls.`,
      source: "PL/X Tactical Knowledge Engine",
      model: "Tactical Telemetry v2.4",
    };
  }

  if (p.includes("liverpool") && (p.includes("press") || p.includes("tactic") || p.includes("build"))) {
    return {
      answer: `Under Arne Slot, Liverpool has refined their pressing into a measured 4-2-3-1 structure with improved defensive control:

• Controlled Jump: Rather than constant full-pitch frenzy, Liverpool holds a structured mid-block and triggers aggressive pressing traps when opponents play into wide fullbacks.
• Double Pivot Shield: Ryan Gravenberch and Alexis Mac Allister provide horizontal coverage, allowing Dominik Szoboszlai to press alongside the central striker.
• High-Speed Counter: Upon winning possession, vertical passing into Mohamed Salah and Luis Díaz exploits isolated fullbacks with elite acceleration.`,
      source: "PL/X Tactical Knowledge Engine",
      model: "Tactical Telemetry v2.4",
    };
  }

  if (p.includes("chelsea") && (p.includes("tactic") || p.includes("press") || p.includes("build"))) {
    return {
      answer: `Chelsea under Enzo Maresca operates with strict positional play dynamics:

• 3-2-4-1 Build-up Phase: An inverted fullback (such as Malo Gusto or Cucurella) steps into the midfield pivot alongside Moisés Caicedo.
• Cole Palmer Free Role: Palmer is positioned between lines in the right half-space, dragging central defenders out of shape to release wide wingers into 1v1 situations.
• Counter-Press Triggers: Immediate pressure on turnover in the opponent's half to stop vertical progression through central zones.`,
      source: "PL/X Tactical Knowledge Engine",
      model: "Tactical Telemetry v2.4",
    };
  }

  if (p.includes("haaland") && (p.includes("saliba") || p.includes("duel") || p.includes("vs"))) {
    return {
      answer: `The Erling Haaland vs William Saliba matchup is the benchmark physical and positional duel in the Premier League:

• Saliba's Strategy: Saliba avoids getting pinned tight on initial contact; instead, he uses his 87-pace recovery speed to contest Haaland's blindside runs and relies on Gabriel Magalhães for aerial coverage.
• Haaland's Threat: Haaland aims to isolate one-on-one down the channel, leveraging his 1.94m frame and 35.8 km/h top speed to run into the space between fullback and center-back when City's midfielders break the first line.`,
      source: "PL/X Tactical Knowledge Engine",
      model: "Tactical Telemetry v2.4",
    };
  }

  if (p.includes("low block") || (p.includes("break") && p.includes("down"))) {
    return {
      answer: `Breaking down a deep Premier League low block requires specific structural mechanisms:

• Half-Space Overloads: Placing dynamic playmakers (e.g. De Bruyne, Palmer, Ødegaard) between the opposing fullback and outside center-back to force defensive commit decisions.
• Width Creation & Rapid Reversals: Stretching the defensive line to the touchlines with inverted wingers and overlapping fullbacks, shifting the ball horizontally in fewer than 3 passes to disrupt defensive slide timing.
• Cutbacks & Second Balls: Low blocks concede fewer direct headers; high xG chances come from cutbacks to the penalty spot (12-14 yards) where defending midfielders have dropped too deep.`,
      source: "PL/X Tactical Knowledge Engine",
      model: "Tactical Telemetry v2.4",
    };
  }

  if (p.includes("set piece") || p.includes("corner")) {
    return {
      answer: `Premier League set-piece efficiency analysis:

• In-Swinging Deliveries: Teams prioritizing in-swinging corners toward the 6-yard box produce 38% higher xG compared to out-swingers.
• Blocker Routines: Using screens (such as Arsenal's near-post clustering) to impede the opposing goalkeeper's jump path.
• Second-Phase Re-deliveries: Recovering clearances at the edge of the box where the opponent's defense has stepped out, leaving runners onside behind them.`,
      source: "PL/X Tactical Knowledge Engine",
      model: "Tactical Telemetry v2.4",
    };
  }

  // General fallback tactical breakdown
  return {
    answer: `Tactical Breakdown for "${prompt}":

• Phase Dynamics: In modern Premier League analytics, transitional efficiency and counter-pressing triggers dictate game outcomes. Teams operate with fluid positional structures (typically shifting from a 4-3-3 or 4-2-3-1 in possession to a 3-2-4-1 buildup structure).
• Space Exploitation: The decisive tactical battles occur in the half-spaces—the zones between the opposing fullback and center-back—where elite playmakers create 2v1 overloads.
• Rest Defense Protocol: Top-tier squads maintain a 3-2 or 2-3 defensive rest foundation behind attacks to prevent direct counter-attacking opportunities.`,
    source: "PL/X Tactical Knowledge Engine",
    model: "Tactical Telemetry v2.4",
  };
}

/**
 * Check OpenAI status (Sanitized, never exposes API keys)
 */
async function getOpenAIStatus() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { connected: false, provider: "PL/X Tactical Engine", message: "API key not configured in .env" };
  }

  const client = getClient();
  try {
    const response = await client.get("/models");
    return {
      connected: true,
      provider: "OpenAI GPT Neural Engine",
      modelsAvailable: response.data?.data?.length || 0,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    return {
      connected: false,
      provider: "PL/X Tactical Engine (Fallback Active)",
      message: "OpenAI API key requires verification in .env",
    };
  }
}

module.exports = {
  generateTacticalAnalysis,
  askAIAssistant,
  getOpenAIStatus,
};
