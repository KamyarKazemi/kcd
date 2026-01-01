import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, X, ChevronDown } from "lucide-react";

const App = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const characters = [
    {
      id: "henry",
      name: "Henry of Skalitz",
      title: "The Blacksmith's Son",
      quote: "I will have vengeance for what they took from me",
      theme: "from-stone-800 via-amber-900/40 to-stone-900",
      accentColor: "amber-600",
      borderColor: "border-amber-700/40",
      textColor: "text-amber-200",
      story: `Born the son of a blacksmith in the quiet village of Skalitz, Henry's life was simple and unremarkable. He learned his father's trade, courted the miller's niece Bianca, and dreamed of a future beyond the forge.\n\nBut when Sigismund of Hungary's army razed Skalitz to the ground, everything changed. Henry watched his parents murdered, his village burned, and his childhood destroyed in a single night of blood and fire.\n\nFleeing to Talmberg with Sir Radzig Kobyla's sword, Henry began a journey that would transform him from a simple blacksmith's son into a warrior. Through trials of combat, betrayal, and self-discovery, he learned that vengeance comes at a cost, and that the path of a warrior is paved with difficult choices.\n\nHis quest for revenge against those who destroyed his home led him deep into the civil war tearing Bohemia apart, and ultimately to the truth about his own origins—secrets that would change everything he thought he knew about himself.`,
    },
    {
      id: "hans",
      name: "Sir Hans Capon",
      title: "Son of Rattay",
      quote: "Come, Henry! Adventure awaits, and I grow bored of waiting",
      theme: "from-slate-800 via-sky-900/40 to-slate-900",
      accentColor: "sky-500",
      borderColor: "border-sky-700/40",
      textColor: "text-sky-200",
      story: `The pampered son of Lord Hanush of Rattay, Hans Capon was born into privilege and spent his youth indulging in every pleasure his station afforded. Spoiled, arrogant, and utterly unprepared for the harsh realities of war, he seemed the very picture of noble decadence.\n\nYet beneath the silk and swagger lay a young man yearning to prove himself worthy of his father's name. When Henry of Skalitz entered his life, an unlikely friendship formed—one that would test and ultimately transform them both.\n\nThrough shared adventures, near-death experiences, and countless misadventures involving tavern brawls, hunts gone wrong, and romantic escapades, Hans slowly shed his aristocratic arrogance. He learned courage not from his title, but from standing beside a blacksmith's son who had lost everything.\n\nBy the end of his journey, Hans had become more than his father's son—he had become a true friend, a capable warrior, and a man of genuine honor, even if he still couldn't resist a good time at the bathhouse.`,
    },
    {
      id: "radzig",
      name: "Sir Radzig Kobyla",
      title: "Lord of Skalitz",
      description: "The Lionheart of Silver",
      quote: "You have much to learn, boy, but you have the heart of a warrior",
      theme: "from-stone-900 via-red-950/50 to-stone-950",
      accentColor: "red-700",
      borderColor: "border-red-800/40",
      textColor: "text-red-200",
      story: `A nobleman of unwavering honor in an age of treachery, Sir Radzig Kobyla stood as one of the few lords who kept faith with King Wenceslas IV during Sigismund's invasion. As Lord of Skalitz, he was known for his martial prowess and his fairness to his people.\n\nBut Radzig carried secrets—secrets bound to the blacksmith's son Henry in ways neither of them understood. When Skalitz fell, he escaped with his life but lost something far more precious: a sword that held the key to his past and his honor.\n\nAs Henry's mentor and commander, Radzig trained the young man in the arts of war, never knowing that fate had tied their destinies together long before that terrible night in Skalitz. His quest to reclaim his sword became intertwined with Henry's quest for vengeance, and both men would discover that some truths are more painful than any wound.\n\nA veteran of countless battles and political intrigues, Radzig represented the old ways of chivalry and honor, fighting desperately to preserve them in a world rapidly descending into chaos. The bond between lord and student would prove stronger than blood—or perhaps, as it turned out, because of it.`,
    },
    {
      id: "theresa",
      name: "Theresa",
      title: "The Miller's Niece",
      quote: "You may be a fool, Henry, but you're my fool",
      theme: "from-amber-950 via-orange-900/30 to-stone-900",
      accentColor: "amber-500",
      borderColor: "border-amber-700/40",
      textColor: "text-amber-100",
      story: `Orphaned and raised by her uncle, the miller of Rattay, Theresa was no delicate flower. Life had taught her to be strong, independent, and resourceful—qualities that would be tested beyond measure when Cumans attacked her home.\n\nShe survived the raid that destroyed so many lives, but the ordeal left scars both visible and hidden. When Henry stumbled back into her life, bloody and desperate, she helped him despite the danger, beginning a bond that would deepen through the trials to come.\n\nTheresa's story is one of survival and strength in a world that offered women few choices. She ran her uncle's mill, defended herself against bandits and worse, and carved out a life on her own terms. Her relationship with Henry was complicated by class, circumstance, and the chaos of war, but through it all she remained fiercely loyal and uncompromisingly honest.\n\nIn a game of knights and nobles, Theresa represented the common folk of Bohemia—resilient, practical, and unwilling to be swept aside by the tides of history. She loved Henry not for who he might become, but for who he was, and that love would prove as enduring as the stone walls of Rattay itself.`,
    },
    {
      id: "godwin",
      name: "Father Godwin",
      title: "The Wayward Priest",
      quote: "A man can serve both God and his appetites—balance is key!",
      theme: "from-stone-900 via-emerald-950/40 to-stone-950",
      accentColor: "emerald-600",
      borderColor: "border-emerald-800/40",
      textColor: "text-emerald-200",
      story: `Father Godwin of Uzhitz was unlike any priest Henry had ever met. Equally comfortable delivering sermons or downing ale, quoting scripture or engaging in philosophical debates over wine, Godwin embraced life's pleasures with the same fervor he brought to his faith.\n\nAssigned to teach Henry to read—a skill essential for investigating the conspiracy threatening Bohemia—Godwin proved to be a teacher, friend, and drinking companion all in one. His methods were unorthodox (involving rather more tavern visits than most priests would approve), but effective nonetheless.\n\nBeneath the jovial exterior lay a sharp mind and genuine wisdom. Godwin understood that faith and humanity weren't opposing forces, and that serving God didn't mean denying the joys of being alive. He had seen enough of the world to know that rigid piety often bred cruelty, while compassion could flourish in the most unexpected places.\n\nHis friendship with Henry revealed a man who had made peace with his own contradictions—a priest who loved God and wine in equal measure, who could debate theology and wenching with the same enthusiasm, and who ultimately believed that kindness mattered more than adherence to every letter of church law.`,
    },
    {
      id: "istvan",
      name: "Sir Istvan Toth",
      title: "The Fallen Knight",
      quote: "They cast me out, now I shall have what is mine by right",
      theme: "from-stone-950 via-orange-950/50 to-black",
      accentColor: "orange-600",
      borderColor: "border-orange-800/40",
      textColor: "text-orange-200",
      story: `Once a respected knight, Istvan Toth's fall from grace was as dramatic as his subsequent rise as a bandit lord. Consumed by bitterness over perceived wrongs and driven by an insatiable thirst for vengeance, he became everything he once swore to fight against.\n\nLeading a band of outlaws from his stronghold at Vranik, Istvan represented the dark mirror of knightly virtue—what happens when honor curdles into obsession and righteousness becomes revenge. He allied with Cumans and bandits, preying on the very people he once protected, all in service of settling old scores.\n\nHis path paralleled Henry's in disturbing ways. Both men had suffered loss and betrayal, both sought vengeance for wrongs done to them. But where Henry found redemption and purpose, Istvan found only deeper darkness. He became the cautionary tale of what Henry could become if he let hatred consume him entirely.\n\nIn the end, Istvan's story served as a grim reminder that the line between justice and vengeance, between honor and obsession, was far thinner than any knight would care to admit. His fall from grace was complete, and his fate a warning to all who would let their anger master them.`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = containerRef.current.scrollTop;
        const height =
          containerRef.current.scrollHeight - containerRef.current.clientHeight;
        setScrollProgress((scrolled / height) * 100);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const playSound = (type) => {
    if (!soundEnabled) return;
    console.log(`Playing sound: ${type}`);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .parchment { 
          background: linear-gradient(135deg, #2c2416 0%, #3d3021 50%, #2c2416 100%);
        }
        .medieval-border {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,0 L100,100 L0,100 Z' fill='none' stroke='%23d4af37' stroke-width='2' opacity='0.3'/%3E%3C/svg%3E");
        }
        .grain-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Sound Toggle */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="fixed top-6 right-6 z-50 p-3 bg-stone-900/80 border border-amber-700/30 rounded hover:bg-stone-800 transition-colors"
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-amber-500" />
        ) : (
          <VolumeX className="w-5 h-5 text-stone-500" />
        )}
      </motion.button>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto scrollbar-hide"
      >
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center parchment overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 grain-texture opacity-40" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)`,
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            {/* Ornate Top Border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-64 h-px bg-linear-to-r from-transparent via-amber-600 to-transparent mx-auto mb-12"
            />

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              <h1
                className="text-7xl md:text-8xl font-bold mb-6 text-amber-100"
                style={{
                  fontFamily: "Georgia, serif",
                  textShadow:
                    "0 4px 12px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.3)",
                }}
              >
                KINGDOM COME
              </h1>
              <p
                className="text-3xl md:text-4xl text-amber-600 mb-8 tracking-widest"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Deliverance
              </p>
            </motion.div>

            {/* Center Decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="w-24 h-24 mx-auto mb-8 relative"
            >
              <div className="absolute inset-0 border-2 border-amber-600/40 rotate-45" />
              <div className="absolute inset-2 border-2 border-amber-600/20 rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-amber-600/20 rounded-full" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <p
                className="text-lg md:text-xl text-stone-300 leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                <span className="text-2xl text-amber-500 float-left mr-2 leading-none">
                  I
                </span>
                n the year of our Lord 1403, the Kingdom of Bohemia stands on
                the precipice of war. When King Wenceslas IV is kidnapped by his
                own half-brother, Sigismund of Hungary, the land descends into
                chaos and bloodshed.
              </p>
              <p
                className="text-lg md:text-xl text-stone-300 leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Amidst this turmoil, a simple blacksmith's son named Henry
                watches his world burn. With his village destroyed and his
                family slain, he must forge himself anew—from boy to warrior,
                from vengeance to justice, in a tale of survival, honor, and
                redemption.
              </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChevronDown className="w-8 h-8 text-amber-600/60 mx-auto" />
              </motion.div>
              <p
                className="text-stone-500 text-sm mt-2 tracking-wider"
                style={{ fontFamily: "Georgia, serif" }}
              >
                DISCOVER THE TALES
              </p>
            </motion.div>

            {/* Ornate Bottom Border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-64 h-px bg-linear-to-r from-transparent via-amber-600 to-transparent mx-auto mt-12"
            />
          </div>
        </section>

        {/* Character Cards Section */}
        <section className="relative min-h-screen py-20 px-4 bg-linear-to-b from-stone-900 via-stone-950 to-black">
          <div className="absolute inset-0 grain-texture opacity-20" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-center mb-4 text-amber-100"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Chronicles of Bohemia
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center text-stone-400 mb-16 text-lg"
              style={{ fontFamily: "Georgia, serif" }}
            >
              The souls who shaped a nation's fate
            </motion.p>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {characters.map((char, idx) => (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onClick={() => {
                    setExpandedCard(char.id);
                    playSound("page-turn");
                  }}
                  className={`relative cursor-pointer group bg-linear-to-br ${char.theme} p-6 ${char.borderColor} border-2 rounded-sm overflow-hidden`}
                  style={{ aspectRatio: "3/4" }}
                >
                  {/* Card Texture */}
                  <div className="absolute inset-0 grain-texture opacity-30" />

                  {/* Decorative Corners */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-600/40" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-600/40" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-600/40" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-600/40" />

                  <div className="relative h-full flex flex-col justify-between">
                    {/* Portrait Placeholder */}
                    <div className="flex-1 flex items-center justify-center mb-4">
                      <div className="relative w-32 h-32 border-2 border-amber-700/40 rounded-full bg-stone-950/50 flex items-center justify-center group-hover:border-amber-600/60 transition-colors">
                        <span
                          className={`text-6xl font-bold ${char.textColor} opacity-40`}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {char.name.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Character Info */}
                    <div className="text-center space-y-2">
                      <h3
                        className={`text-2xl font-bold ${char.textColor}`}
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {char.name}
                      </h3>
                      <p
                        className="text-stone-400 text-sm tracking-wide"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {char.title}
                      </p>
                      <div className="w-16 h-px bg-amber-700/40 mx-auto my-3" />
                      <p
                        className="text-stone-300 text-sm italic leading-relaxed px-2"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        "{char.quote}"
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className={`mt-4 px-6 py-2 bg-${char.accentColor}/20 border border-${char.accentColor}/40 ${char.textColor} text-sm tracking-wider hover:bg-${char.accentColor}/30 transition-colors`}
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        READ MORE
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Expanded Character Lore */}
      <AnimatePresence>
        {expandedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setExpandedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 90 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              {(() => {
                const char = characters.find((c) => c.id === expandedCard);
                return (
                  <div
                    className={`relative bg-linear-to-br ${char.theme} p-8 md:p-12 ${char.borderColor} border-4 rounded-sm`}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setExpandedCard(null)}
                      className={`absolute top-4 right-4 p-2 ${char.textColor} hover:bg-black/30 rounded transition-colors`}
                    >
                      <X className="w-6 h-6" />
                    </button>

                    {/* Decorative Header */}
                    <div className="text-center mb-8">
                      <div className="w-24 h-px bg-amber-700/40 mx-auto mb-6" />
                      <h2
                        className={`text-5xl font-bold ${char.textColor} mb-2`}
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {char.name}
                      </h2>
                      <p
                        className="text-stone-400 text-xl tracking-wide"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {char.title}
                      </p>
                      <div className="w-24 h-px bg-amber-700/40 mx-auto mt-6" />
                    </div>

                    {/* Story Content */}
                    <div className="prose prose-invert max-w-none">
                      {char.story.split("\n\n").map((paragraph, idx) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="text-stone-300 text-lg leading-relaxed mb-6 first-letter:text-4xl first-letter:font-bold first-letter:text-amber-500 first-letter:float-left first-letter:mr-2"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>

                    {/* Decorative Footer */}
                    <div className="mt-8 flex justify-center">
                      <div className="w-32 h-px bg-amber-700/40" />
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
