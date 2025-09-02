import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import {
  ThumbsUp,
  ThumbsDown,
  Users,
  TrendingUp,
  Heart,
  Share2,
  CheckCircle,
} from "lucide-react";
import AnimatedCard from "./ui/AnimatedCard";
import {
  saveVotingResult,
  getVotingResults,
} from "../services/firebaseService";

const CommunityVoting = ({ projectId, projectData }) => {
  const [votes, setVotes] = useState({ up: 0, down: 0, total: 0 });
  const [userVote, setUserVote] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    loadVotingData();
  }, [projectId]);

  const loadVotingData = async () => {
    try {
      // جلب البيانات من Firebase
      const firebaseVotes = await getVotingResults(projectId);

      if (firebaseVotes && firebaseVotes.length > 0) {
        const upVotes = firebaseVotes.filter(
          (vote) => vote.vote === "up"
        ).length;
        const downVotes = firebaseVotes.filter(
          (vote) => vote.vote === "down"
        ).length;

        setVotes({
          up: upVotes,
          down: downVotes,
          total: upVotes + downVotes,
        });
      } else {
        // جلب البيانات من localStorage كنسخة احتياطية
        const savedVotes = localStorage.getItem(`votes_${projectId}`);
        if (savedVotes) {
          setVotes(JSON.parse(savedVotes));
        }
      }

      // التحقق من تصويت المستخدم
      const userVoteKey = `userVote_${projectId}`;
      const savedUserVote = localStorage.getItem(userVoteKey);
      if (savedUserVote) {
        setUserVote(savedUserVote);
        setHasVoted(true);
      }
    } catch (error) {
      console.error("خطأ في تحميل بيانات التصويت:", error);
      // استخدام localStorage كنسخة احتياطية
      const savedVotes = localStorage.getItem(`votes_${projectId}`);
      if (savedVotes) {
        setVotes(JSON.parse(savedVotes));
      }
    }
  };

  const handleVote = async (voteType) => {
    if (hasVoted) return;

    const newVotes = { ...votes };
    if (voteType === "up") {
      newVotes.up += 1;
    } else {
      newVotes.down += 1;
    }
    newVotes.total = newVotes.up + newVotes.down;

    setVotes(newVotes);
    setUserVote(voteType);
    setHasVoted(true);
    setShowCelebration(true);

    try {
      // حفظ التصويت في Firebase
      const result = await saveVotingResult(projectData, { vote: voteType });
      if (result) {
        console.log("تم حفظ التصويت في Firebase بنجاح");
      } else {
        console.log("تم حفظ التصويت في localStorage فقط");
      }
    } catch (error) {
      console.error("خطأ في حفظ التصويت في Firebase:", error);
    }

    // حفظ في localStorage كنسخة احتياطية
    localStorage.setItem(`votes_${projectId}`, JSON.stringify(newVotes));
    localStorage.setItem(`userVote_${projectId}`, voteType);

    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleShare = () => {
    setShowShare(true);
    setTimeout(() => setShowShare(false), 2000);
  };

  const approvalRate =
    votes.total > 0 ? Math.round((votes.up / votes.total) * 100) : 0;

  return (
    <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">رأي المجتمع</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl border border-green-500/30"
          whileHover={{ scale: 1.05 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            key={approvalRate}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-green-400 mb-2"
          >
            {approvalRate}%
          </motion.div>
          <div className="text-sm text-green-300 font-medium">
            نسبة الموافقة
          </div>
        </motion.div>

        <motion.div
          className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl border border-blue-500/30"
          whileHover={{ scale: 1.05 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            key={votes.total}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-blue-400 mb-2"
          >
            {votes.total}
          </motion.div>
          <div className="text-sm text-blue-300 font-medium">
            إجمالي الأصوات
          </div>
        </motion.div>
      </div>

      <div className="flex gap-3 mb-6">
        <motion.button
          onClick={() => handleVote("up")}
          disabled={hasVoted}
          whileHover={!hasVoted ? { scale: 1.05 } : {}}
          whileTap={!hasVoted ? { scale: 0.95 } : {}}
          className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-medium transition-all duration-300 ${
            hasVoted && userVote === "up"
              ? "bg-green-500/30 text-green-300 border-2 border-green-400"
              : hasVoted
              ? "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              : "bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30 hover:border-green-400"
          }`}
        >
          <ThumbsUp className="w-5 h-5" />
          مناسب
        </motion.button>

        <motion.button
          onClick={() => handleVote("down")}
          disabled={hasVoted}
          whileHover={!hasVoted ? { scale: 1.05 } : {}}
          whileTap={!hasVoted ? { scale: 0.95 } : {}}
          className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-medium transition-all duration-300 ${
            hasVoted && userVote === "down"
              ? "bg-red-500/30 text-red-300 border-2 border-red-400"
              : hasVoted
              ? "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              : "bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 hover:border-red-400"
          }`}
        >
          <ThumbsDown className="w-5 h-5" />
          غير مناسب
        </motion.button>
      </div>

      <AnimatePresence>
        {hasVoted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-sm text-white/70 mb-4 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            شكراً لتصويتك! يمكنك مشاركة هذا المشروع مع الآخرين.
          </motion.div>
        )}
      </AnimatePresence>

      {/* شريط التقدم المتحرك */}
      <div className="w-full bg-gray-500/20 rounded-full h-4 overflow-hidden mb-4">
        <motion.div
          className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${approvalRate}%` }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* أزرار إضافية */}
      <div className="flex gap-3">
        <motion.button
          onClick={handleShare}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <Share2 className="w-4 h-4" />
          مشاركة
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <Heart className="w-4 h-4" />
          إعجاب
        </motion.button>
      </div>

      {/* تأثير الاحتفال */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 1.5 }}
              className="text-8xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* تأثير المشاركة */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 bg-green-500/90 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            تم نسخ الرابط!
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};

CommunityVoting.propTypes = {
  projectId: PropTypes.string.isRequired,
  projectData: PropTypes.shape({
    region: PropTypes.string.isRequired,
    projectType: PropTypes.string.isRequired,
    audience: PropTypes.string.isRequired,
    investment: PropTypes.number.isRequired,
  }).isRequired,
};

export default CommunityVoting;
