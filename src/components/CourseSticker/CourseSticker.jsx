import './courseSticker.css';

const CourseSticker = ({type, value}) => {
  return (
    <div className={`course-sticker ${type}`}>
      <span className="course-sticker-label">{value}</span> <span className="course-sticker-km">км</span>
    </div>
  );
};

export default CourseSticker;
