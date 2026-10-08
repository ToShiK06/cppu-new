import { useEffect, useState } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import SparksBackground from "../components/ui/SparksBackground";
import FlameBackground from "../components/ui/FlameBackground";
import { getReviews, submitReview } from "../services/firestore";
import { setMeta } from "../utils/seo";
import "./ReviewsPage.css";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ author: "", text: "" });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setMeta({
      title: "Отзывы — ЦППУ",
      description: "Отзывы клиентов Центра противопожарных услуг.",
    });
    getReviews()
      .then(setReviews)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.author || !form.text) return;
    try {
      await submitReview(form);
      setForm({ author: "", text: "" });
      setStatus("success");
      const updated = await getReviews();
      setReviews(updated);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="reviews-page">
      <FlameBackground />
      <SparksBackground count={100} />

      <div className="container reviews-page__inner">
        <div className="reveal">
          <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Отзывы" }]} />
          <SectionTitle title="Отзывы" subtitle="Что говорят о нас клиенты" />
        </div>

        {loading && <Loader />}

        {!loading && reviews.length === 0 && (
          <p className="reviews__empty">Пока нет отзывов. Будьте первым!</p>
        )}

        {!loading && reviews.length > 0 && (
          <div className="grid">
            {reviews.map((r, i) => (
              <div
                key={r.id}
                className="review reveal-scale"
                style={{ transitionDelay: `${(i % 6) * 60}ms` }}
              >
                <p className="review__text">«{r.text}»</p>
                <span className="review__author">{r.author}</span>
              </div>
            ))}
          </div>
        )}

        <div className="reviews__form-wrap reveal">
          <h3>Оставить отзыв</h3>
          <form onSubmit={handleSubmit} className="reviews__form">
            <Input
              label="Ваше имя или организация"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
            />
            <label className="field">
              <span className="field__label">Отзыв</span>
              <textarea
                className="input"
                rows="4"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                required
              />
            </label>
            <Button type="submit" block>Отправить отзыв</Button>
            {status === "success" && <p className="form-success">Спасибо за отзыв.</p>}
            {status === "error" && <p className="form-error">Ошибка отправки.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}